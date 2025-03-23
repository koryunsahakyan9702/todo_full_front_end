import React, { useEffect, useState } from 'react'
import api from "../../service/api.js"
import "./TodoList.css"
import { useForm } from 'react-hook-form'
import { useLocation, useNavigate } from 'react-router-dom'
function TodoList() {
  const location=useLocation()
  const navigate=useNavigate()
  const[change,setChange]=useState(false)
  useEffect(() => {
    const token = sessionStorage.getItem('token') || localStorage.getItem('token');
    if (!token) {
      navigate("/"); 
    } else {
      fetchTasks(token);
    }
  }, [change]);
  const fetchTasks = async (token) => {
    try {
      const response = await api.get('tasks/all', {
        headers: {
          Authorization: `Bearer ${token}`, 
        }
      });
      setState(response.data);
    } catch (error) {
      console.log(error);
      navigate("/"); 
    }
  };
    const [state,setState]=useState([])
    const {register,watch,handleSubmit,reset,formState:{errors}}=useForm({
        mode:"onBlur"
    })
    const taskValue = watch("tasks", "");
  const isDisabled = taskValue.length < 3; 
 async function onSubmit(data){
    data.completed=false
    try {
      const response=await api.post('/tasks/create',data)
      console.log(response.data)
      setChange(!change)
      reset();
    } catch (error) {
      console.log(error)
    }
  }
  async function deleteTask(id){
    try {
      const response=await api.delete(`/tasks/delete/${id}`)
      console.log(response.data)
      setChange(!change)
    } catch (error) {
      console.log(error)
    }
  }
 async function updateTask(id){
    try {
      const response=await api.put(`tasks/update/${id}`,{completed:true})
      setChange(!change)
      console.log(response.data)
    } catch (error) {
      console.log(error)
    }
  }
  function handleLogout(){
    sessionStorage.removeItem('token')
    localStorage.removeItem('token')
    navigate('/')
  }
return(
    <div className='w-full flex justify-center items-center flex-col gap-4'>
    <div className='typing w-full flex justify-center items-center'>
      To Do
    </div>
        <form className='w-full max-w-md flex flex-col items-center justify-center gap-2'
            onSubmit={handleSubmit(onSubmit)}
        >
            <div className=' flex gap-8'>
            <input {...register("tasks",{required:"Task name is required",
                minLength:{
                    value:3,
                    message:"Task name must be at least 3 characters long."
                }
            })} type="text" placeholder='Add your task' className='border w-full border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500'/>
            <button    disabled={isDisabled}
          className={`px-4 py-2 rounded-md shadow-md transition duration-300 
            ${
              isDisabled
                ? "bg-gray-400 cursor-not-allowed" 
                : "bg-blue-500 text-white hover:bg-blue-600 cursor-pointer" 
            }`}>Add</button>
            </div>
            {errors.task && <p className="text-red-500">{errors.task.message}</p>}
        </form>
        <div className='w-full flex flex-col justify-center items-center gap-4'>
  {state.length>0&&state.map((st) => (
    <div key={st.id} className='w-full max-w-md flex justify-between items-center bg-gray-100 p-3 rounded-lg shadow'>
      <span className={`${st.completed===1 ? "line-through text-gray-500" : "text-black"} text-lg`}>
        {st.tasks}
      </span>
      <div className='flex gap-3'>
        {st.completed===0 && <span onClick={()=>{updateTask(st.id)}} className='cursor-pointer'>✔</span>}
        <span onClick={()=>deleteTask(st.id)}
        className='cursor-pointer text-black/50 hover:text-black duration-300'>✖</span>
      </div>
    </div>
  ))}
</div>
<button
  onClick={handleLogout}
  className="px-4 py-2 mt-4 mb-2 rounded-md shadow-md bg-red-500 text-white hover:bg-red-600 cursor-pointer"
>
  Logout
</button>
    </div>
)
}

export default TodoList