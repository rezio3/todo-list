"use client";

import TodoList from "../components/TodoList";
import Form from "../components/Form";
import React from "react";

const TaskView = () => {
  return (
    <main className="flex min-h-screen flex-row p-24">
      <div>
        <TodoList />
      </div>
      <div className="flex flex-col ml-10 w-[500px]">
        <Form />
      </div>
    </main>
  );
};

export default TaskView;
