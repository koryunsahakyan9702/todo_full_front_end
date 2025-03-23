import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../service/api.js'
import InputField from '../Inputs/InputField.jsx';

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
          
          <InputField
          name='firstName'
          type='text'
          errors={errors}
          label='FirstName'
          register={register}
          validationRules={{
            required:'First name is required',
            minLength:{
              value: 5,
              message: "First name must be at least 5 characters long",
            }
          }}
          />
        <InputField
          name='lastName'
          type='text'
          errors={errors}
          label='LastName'
          register={register}
          validationRules={{
            required:'Last name is required',
            minLength:{
              value: 5,
              message: "Last name must be at least 5 characters long",
            }
          }}
          />
         <InputField
          name='email'
          type='email'
          errors={errors}
          label='Email'
          register={register}
          validationRules={{
            required:'Email is required',
            minLength:{
              value: 5,
              message: "Email must be at least 5 characters long",
            },
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              message: "Invalid email format",
            },
          }}
          />
          <InputField
          name='password'
          type='password'
          errors={errors}
          label='Password'
          register={register}
          validationRules={{
            required:'Pssword is required',
            minLength:{
              value: 5,
              message: "Password must be at least 5 characters long",
            },
            
          }}
          />
         

         

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
