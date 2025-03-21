import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../service/api.js'

function Registration() {
  const navigate=useNavigate()
  const { 
    register, 
    handleSubmit, 
    reset, 
    formState: { errors, isValid } 
  } = useForm({
    mode: "onBlur",
    criteriaMode: "all",
  });

  const onSubmit =async (data) => {
    try {
      const response=await api.post('users/signUp',data)
      navigate("/login")
    } catch (error) {
      if(error.status===409){
        alert("A user with this email already exists.")
        reset()
      }
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen py-4 bg-gray-100">
      <div className="w-full md:w-1/2 p-8 bg-white shadow-lg rounded-lg">
        <h2 className="text-center text-2xl font-semibold mb-6">Registration</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">First Name</label>
            <input
              type="text"
              placeholder="Enter your first name"
              {...register("firstName", {
                required: "First name is required",
                minLength: {
                  value: 5,
                  message: "First name must be at least 5 characters long",
                },
              })}
              className="mt-2 block w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Last Name</label>
            <input
              type="text"
              placeholder="Enter your last name"
              {...register("lastName", {
                required: "Last name is required",
                minLength: {
                  value: 5,
                  message: "Last name must be at least 5 characters long",
                },
              })}
              className="mt-2 block w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
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
                },
              })}
              className="mt-2 block w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 5,
                  message: "Password must be at least 5 characters long",
                },
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
              Register
            </button>
          </div>
        </form>
        <Link className='mt-2' to="/">Home page</Link>
        
      </div>
    </div>
  );
}

export default Registration;
