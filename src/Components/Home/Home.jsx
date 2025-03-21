import React from 'react'
import { Link } from 'react-router-dom'

function Home() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-300 to-blue-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm text-center">
        <h1 className="text-3xl font-semibold text-gray-800 mb-4">Welcome to Our App</h1>
        <p className="text-gray-600 mb-8">Choose an option to get started:</p>
        <div className="flex justify-center gap-4">
          <Link to="/login">
            <button className="px-6 py-3 cursor-pointer text-white bg-green-500 hover:bg-green-600 rounded-md transition duration-300">
              Login
            </button>
          </Link>
          <Link to="/registration">
            <button className="px-6 py-3 cursor-pointer text-white bg-blue-500 hover:bg-blue-600 rounded-md transition duration-300">
              Register
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Home
