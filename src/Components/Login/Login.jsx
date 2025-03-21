import React, { useState } from 'react'
import api from '../../service/api.js'
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';

function Login() {
  const[remember,setRemember]=useState(false)
  const navigate=useNavigate();
  const {register,reset,handleSubmit,formState:{errors,isValid}}=useForm({
    mode:"onBlur",
    criteriaMode:"all",
  })
  
  async function onSubmit(data){
    try{
      const response=await api.post('users/signIn',data)
      if(remember){
        localStorage.setItem('token',response.data.token)
      }
      else{
        sessionStorage.setItem('token',response.data.token)
      }
      navigate('/todo-list',{state:response.data.token})
      
    }
    catch(err){
      if(err.status===401){
        alert("You have entered an incorrect email or password")
        reset()
      }
    }
  }
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full md:w-1/2   p-8 bg-white shadow-lg rounded-lg">
        <h2 className="text-center text-2xl font-semibold mb-6">Login</h2>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              {...register("email", {
                required: "Email is required",
                minLength: {
                  value: 3,
                  message: "Email must be at least 3 characters long",
                },
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "Invalid email format",
                }
              })}
              className="mt-2 block w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 5,
                  message: "Password must be at least 5 characters long",
                }
              })}
              className="mt-2 block w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
          </div>

          <div>
            <button
              type="submit"
              disabled={!isValid}  
              className={`w-full py-3 rounded-md transition duration-300 
                ${!isValid ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 text-white hover:bg-blue-600 cursor-pointer"}`}
            >
              Login
            </button>
          </div>
        </form>
        <div className='flex gap-2'>
          <input type="checkbox" value={remember} checked={remember} onChange={()=>{setRemember(!remember)}}/>
          <p>remember me</p>
        </div>
        <Link to='/registration'>Do you want to register?</Link>
        
      </div>
    </div>
  );
      
}

export default Login