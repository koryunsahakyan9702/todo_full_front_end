
import './App.css'
import { Link, Route, Routes } from 'react-router-dom'
import Login from './Components/Login/Login.jsx'
import Registration from './Components/Registration/Registration'
import TodoList from './Components/TodoList/TodoList.jsx'

import Home from './Components/Home/Home.jsx'
function App() {


  return (
    <div className='w-full  flex flex-col  justify-center items-center gap-8'>
        <div className='w-full justify-center items-center'>
          <Routes>
          <Route path='/' element={<Home/>} />
            <Route path='/login' element={<Login/>} />
            <Route path='/registration' element={<Registration/>} />
            <Route path='/todo-list' element={ <TodoList />} />
          </Routes>
        </div>
    </div>)
}

export default App
