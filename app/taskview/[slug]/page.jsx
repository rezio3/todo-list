"use client";

import { useRecoilState } from "recoil";
import { tasksListAtom } from "../../atoms/taskList";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import "../../style/button.css";
import { Button } from "rebass";

const TodoItem = () => {
  const [tasksList, setTasksList] = useRecoilState(tasksListAtom);

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
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (tasksList.length === 0) {
      fetchTodoList();
    }
  }, []);

  const router = useRouter();
  const url = useParams();
  const taskDetails = tasksList.find((e) => String(e.id) === url.slug);

  const backHandler = () => {
    router.back();
  };
  return (
    <div className="m-24 p-4 bg-gray-800 w-[400px] h-[600px]">
      <>
        <Button
          onClick={backHandler}
          className="bg-gray-600 btn"
          mb={3}
        >
          Back
        </Button>
        <h3 className="text-lg">Task</h3>
        {taskDetails ? (
          <span className="text-md">{taskDetails.title}</span>
        ) : null}
        <h3 className="text-lg mt-6">Status</h3>
        {taskDetails ? (
          <span className="text-md">{taskDetails.status}</span>
        ) : null}
        <h3 className="text-lg mt-6">Created</h3>
        {taskDetails ? (
          <span className="text-md">{taskDetails.due_on}</span>
        ) : null}
        <h3 className="text-lg mt-6">User</h3>
        {taskDetails ? (
          <span className="text-md">{taskDetails.user_id}</span>
        ) : null}
      </>
    </div>
  );
};

export default TodoItem;
