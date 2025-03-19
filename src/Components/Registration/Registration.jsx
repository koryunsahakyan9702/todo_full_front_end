import React from 'react'
import  { useState } from 'react';
import api from '../../service/api.js'


function Registration() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
  
    const handleSubmit = async(e) => {
      e.preventDefault();
     try {
        const response=await api.post('/users/create',{
            email,
            firstName,
            lastName,
            password,
        })
        console.log(response.data)
     } catch (error) {
        console.log(error)
     }
    };
  
    return (
      <form onSubmit={handleSubmit} className='w-[20%] flex flex-col gap-3'>
        <input
          className='border border-black rounded-lg'
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          placeholder="First Name"
        />
        <input
          className='border border-black rounded-lg'
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          placeholder="Last Name"
        />
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
        <button className='p-2 border border-black rounded-lg cursor-pointer bg-blue-500/50' type="submit">Register</button>
      </form>
    );
}

export default Registration