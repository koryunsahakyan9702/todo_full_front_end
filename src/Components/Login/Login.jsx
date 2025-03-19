import React from 'react'
import api from '../../service/api.js'
import  { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
    const [email, setEmail] = useState('');
     const [password, setPassword] = useState('');
    const navvigate=useNavigate()
  const handleSubmit = async(e) => {
    e.preventDefault();
    try{
        const response=await api.post('/users/login',{
            email,
            password
        })
        sessionStorage.setItem('token',response.data.token)
       // navvigate('/users')
       console.log(response.data)
    }
    catch(e){
        console.log(e)
    }
    
  };

  return (
    <form onSubmit={handleSubmit} className='w-[20%] flex flex-col gap-3'>
      <input
        className='border border-black rounded-lg'
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <input
        className='border border-black rounded-lg'
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button className='p-2 border border-black rounded-lg cursor-pointer bg-blue-500/50' type="submit">Login</button>
    </form>
  );
}

export default Login