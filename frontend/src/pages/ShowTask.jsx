import React, { useEffect, useState } from "react";
import { object, z } from "zod";
import { getZodError } from "../helper/getZodError.js";
import { showToast } from "../helper/ShowToast.js";
import { useParams } from "react-router-dom";

function ShowTask() {
  const { taskId } = useParams();
  const [apiData, setApiData] = useState();
  const [formData, setFormData] = useState();
  const [err, setError] = useState();

  const taskSchema = z.object({
    title: z
      .string()
      .min(3, { message: "title must be at least 3 charector long" }),
    description: z
      .string()
      .min(3, { message: "discription must be at least 3 charector long" })
      .max(500, { message: "Length acceeded" }),
    status: z.enum(["Pending", "Running", "Completed", "Failed"]),
  });

  const handleInput = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    console.log('form data' , formData);
    
  };

  useEffect(() => {
    const getTask = async () => {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/v1/tasks/show-task/${taskId}`
      );
      const data = await response.json();
      // console.log(data);

      setApiData(data);
      setFormData(data.taskData);
    };
    getTask();
  }, []);

  const hanldeSubmit = async (e) => {
    e.preventDefault();
    try {
      const validetedData = taskSchema.parse(formData);

      const responseData = await fetch(
        `${
          import.meta.env.VITE_API_BASE_URL
        }/api/v1/tasks/update-task/${taskId}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(validetedData),
        }
      );

      const data = await responseData.json();

      if (!responseData.ok) {
        throw new Error(data.message);
      }
      // console.log("responce form sever", data);
      setFormData({});
      showToast("success", data.message);
      console.log(formData.status);
    } catch (error) {
      if (error instanceof z.ZodError) {
        const zodError = getZodError(error.errors);
        setError(zodError);
      }
      showToast("error", error.message);
    }
  };

  return (
    <div className="pt-5">
      <h1 className="text-2xl font-bold mb-5"> Task details</h1>
      {apiData && apiData.success ? (
        <form onSubmit={hanldeSubmit}>
          <div className="mb-5">
            <label className="block mb-2 text-sm font-medium text-gray-900 ">
              Title
            </label>
            <input
              onChange={handleInput}
              value={formData?.title || ""}
              name="title"
              type="text"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="Task title"
              required
            />
          </div>

          {err && err.title && (
            <span className="text-red-700">{err.title}</span>
          )}

          <div className="mb-5">
            <label className="block mb-2 text-sm font-medium text-gray-900 ">
              Description
            </label>
            <textarea
              value={formData?.description || ""}
              onChange={handleInput}
              name="description"
              rows="4"
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Task description..."
            ></textarea>
            {err && err.description && (
              <span className="text-red-700">{err.description}</span>
            )}
          </div>

          <div className="mb-5">
            <label className="block mb-2 text-sm font-medium text-gray-900 ">
              Description
            </label>
            <select
              onChange={handleInput}
              defaultValue={formData.status || ''}
              name="status"
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="Pending">Pending</option>
              <option value="Running">Running</option>
              <option value="Completed">Completed</option>
              <option value="Failed">Failed</option>
            </select>
            {err && err.success && (
              <span className="text-red-700">{err.success}</span>
            )}
          </div>

          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
          >
            Submit
          </button>
        </form>
      ) : (
        <>data not Found</>
      )}
    </div>
  );
}

export default ShowTask;
