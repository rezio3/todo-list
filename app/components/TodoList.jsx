"use client";

import { useRecoilState } from "recoil";
import { completedTaskCounter, tasksListAtom } from "../atoms/taskList";
import "../style/todoList.css";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button, Heading, Text } from "rebass";

const TodoList = () => {
  const [searchInputValue, setSearchInputValue] = useState("");
  const [tasksFiltered, setTasksFiltered] = useState();
  const [tasksList, setTasksList] = useRecoilState(tasksListAtom);
  const [completedTaskCount, setCompletedTaskCount] =
    useRecoilState(completedTaskCounter);

  const fetchTodoList = async () => {
    try {
      const response = await fetch(
        "https://gorest.co.in/public/v2/users/6940135/todos?page=1&per_page=100",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "X-Pagination-Limit": 100,
            Authorization:
              "Bearer b983d32020827112aaaeb8065fe3eb0a21e82fd379111b09c5adaec78c4af5aa",
          },
        }
      );
      const data = await response.json();
      setTasksList(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (tasksList.length === 0) {
      fetchTodoList();
    }
  }, []);

  useEffect(() => {
    const completedTasks = tasksList.filter(
      (task) => task.status === "completed"
    );
    setCompletedTaskCount(completedTasks.length);
  }, [tasksList]);

  const currentUrl = window.location.href;

  const doneBtnHandler = async (task) => {
    const index = tasksList.findIndex((e) => e.id === task.id);
    const updatedTasks = tasksList.slice();
    updatedTasks[index] = {
      ...updatedTasks[index],
      status: "completed",
    };
    setTasksList(updatedTasks);
    setSearchInputValue("");
  };
  const searchInputHandler = (event) => {
    setSearchInputValue(event.target.value);
  };
  useEffect(() => {
    const filteredTasks = tasksList.filter((task) =>
      task.title.toLowerCase().includes(searchInputValue.toLowerCase())
    );
    setTasksFiltered(filteredTasks);
  }, [searchInputValue]);

  const tasksToView = searchInputValue === "" ? tasksList : tasksFiltered;

  return (
    <div className="flex flex-col items-center p-4 bg-gray-800 w-[500px] h-[80vh]">
      <div className="w-full flex justify-between">
        <Heading fontSize={4} fontWeight="bold">
          Task List
        </Heading>
        <div className="flex flex-col">
          <Text>Pending: {tasksList.length - completedTaskCount}</Text>
          <Text>Completed: {completedTaskCount}</Text>
        </div>
      </div>
      <div className="w-full mb-4">
        <label htmlFor="search">Search: </label>
        <input
          type="text"
          id="search"
          className="p-1 bg-gray-600"
          onChange={searchInputHandler}
          value={searchInputValue}
        />
      </div>
      <div className="w-full overflow-auto">
        {tasksList
          ? tasksToView.map((task) => {
              return (
                <div className="flex w-full" key={task.title}>
                  <Link
                    href={`${currentUrl}/taskview/${task.id}`}
                    className={`w-[85%] flex justify-between items-center mt-2 p-2 ps-4 ${
                      task.status === "pending"
                        ? `bg-gray-700 task-item`
                        : `bg-green-800`
                    }`}
                  >
                    <Text className="text-wrap text-sm max-w-[130px]" color={white}>
                      {task.title}
                    </Text>

                    <Text className="ms-2 text-sm text-gray-400">
                      {task.due_on}
                    </Text>
                  </Link>
                  <div className="pt-1 ms-2 flex flex-col justify-center">
                    {task.status === "pending" ? (
                      <Button
                        className="done-button"
                        fontSize={1}
                        width={3}
                        onClick={() => doneBtnHandler(task)}
                      >
                        Done
                      </Button>
                    ) : null}
                  </div>
                </div>
              );
            })
          : null}
      </div>
    </div>
  );
};

export default TodoList;
