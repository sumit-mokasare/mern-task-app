import React, { useEffect, useState } from "react";
import { Task } from "../components/Task";

const TaskListPage = () => {
  const [tasks, setTask] = useState();

  useEffect(() => {
    const getTask = async () => {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/v1/tasks/get-all-task`
      );

      const data = await response.json();
      // console.log('asdfas', data);
  
      setTask(data);
    };
    getTask();
  }, []);

  return (
    <div className="pt-5">
      <h1 className="text-2xl font-bold mb-5">My Tasks</h1>
      {tasks && tasks.success ? 
      tasks.taskData.map((task)=> <Task key={task.title} props={task}/>)
      : 
      <>loding...</>}

    </div>
  );
};

export default TaskListPage;
