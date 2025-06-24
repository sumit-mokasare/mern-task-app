import React, { useEffect, useState } from "react";
import { Task } from "../components/Task";
import {showToast} from '../helper/ShowToast.js'

const TaskListPage = () => {
  const [tasks, setTask] = useState();
  const [referesh , setReferesh] = useState(false)

  useEffect(() => {
    setReferesh(false)
    const getTask = async () => {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/v1/tasks/get-all-task`
      );
      const data = await response.json();
  
      setTask(data);
    };
    getTask();
  }, [referesh]);

  const deleteTask = async(taskid)=>{
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/v1/tasks/delete-task/${taskid}`,
        {
          method: "DELETE"
        }
      );
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message)
      }
      setReferesh(true)
      showToast('success' , data.message)
    } catch (error) {
         showToast('success' , error.message)
    }
  }

  return (
    <div className="pt-5">
      <h1 className="text-2xl font-bold mb-5">My Tasks</h1>
      {tasks && tasks.success ? 
      tasks.taskData.length > 0 ?
      tasks.taskData.map((task)=> <Task key={task.title} props={task} onDelete={deleteTask}/> ) : <span className="text-center text-red-500">No Task avelible</span>
      : 
      <>loding...</>}

    </div>
  );
};

export default TaskListPage;
