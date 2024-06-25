"use client";
import { useState } from "react";
import "../style/button.css";
import moment from "moment";
import { useRecoilState } from "recoil";
import { formSignsCounter } from "../atoms/taskList";
import { Button, Text } from "rebass";

const Form = () => {
  const [taskTitle, setTaskTitle] = useState("");
  const [success, setSuccess] = useState(false);
  const [isInputEmpty, setIsInputEmpty] = useState(false);

  const [formSigns, setFormSigns] = useRecoilState(formSignsCounter);

  const inputHandler = (event) => {
    setFormSigns(event.target.value.length);
    if (event.target.value.length >= 80) return;
    setTaskTitle(event.target.value);
  };

  const handleSubmit = async () => {
    if (taskTitle === "") {
      setIsInputEmpty(true);
      return;
    } else {
      setIsInputEmpty(false);
    }
    const date = moment().format("MMMM Do YYYY, h:mm:ss a");
    const newTask = {
      title: taskTitle,
      user: "6940132",
      status: "pending",
      due_on: date,
    };

    try {
      await fetch("https://gorest.co.in/public/v2/users/6940135/todos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "Bearer b983d32020827112aaaeb8065fe3eb0a21e82fd379111b09c5adaec78c4af5aa",
        },
        body: JSON.stringify(newTask),
      });
    } catch (error) {
      console.log(error);
    }

    setTaskTitle("");
    setFormSigns(0);
    setSuccess(true);
    location.reload();
    setTimeout(() => {
      setSuccess(false);
    }, 1000);
  };
  return (
    <div className="p-4 bg-gray-800 w-full">
      <h2 className="text-lg">Create new task</h2>
      <form className="flex flex-col mt-2">
        <textarea
          onChange={inputHandler}
          id="taskName"
          type="text"
          value={taskTitle}
          className="w-[300px] h-[100px] p-1 bg-gray-600"
          placeholder="Task"
        />
      </form>
      <span className="block mb-3 mt-1 text-gray-400 text-[12px]">
        {formSigns}/80
      </span>
      <div className="flex items-center">
        <Button
          onClick={handleSubmit}
          className="p-2 bg-gray-600 btn"
          fontSize={2}
          width={1 / 4}
        >
          Add task
        </Button>
        {success ? (
          <Text className="text-green-400" p={2}>
            Success!
          </Text>
        ) : null}
        {isInputEmpty ? (
          <Text className="text-red-400" p={2}>
            Field cannot be empty!
          </Text>
        ) : null}
      </div>
    </div>
  );
};

export default Form;
