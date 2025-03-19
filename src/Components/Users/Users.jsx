import React, { useEffect, useState } from 'react'
import api from "../../service/api.js"

function Users() {
    const [users,setUsers]=useState([])
    useEffect(()=>{
        const fetchUsers=async()=>{
            try {
                const response=await api.get('/users/')
                setUsers(response.data)
            } catch (error) {
                console.log(error)
            }

        }
        fetchUsers()
    },[])
    async function handleDelete(id){
        try {
            const response=await api.delete(`/users/delete/${id}`)
            console.log(response.data)
            setUsers(users.filter(user => user.id !== id));

            
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-300">
                <thead>
                    <tr>
                        <th className="px-4 py-2 border">Name</th>
                        <th className="px-4 py-2 border">Last Name</th>
                        <th className="px-4 py-2 border">Email</th>
                        <th className="px-4 py-2 border">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.id}>
                            <td className="px-4 py-2 border">{user.firstName}</td>
                            <td className="px-4 py-2 border">{user.lastName}</td>
                            <td className="px-4 py-2 border">{user.email}</td>
                            <td className="px-4 py-2 border">
                                <button 
                                    onClick={() => handleDelete(user.id)} 
                                    className="text-red-500 hover:text-red-700 cursor-pointer"
                                >
                                    X
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>)
}

export default Users