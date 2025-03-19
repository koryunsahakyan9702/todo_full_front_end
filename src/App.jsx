
import './App.css'
import { Link, Route, Routes } from 'react-router-dom'
import Login from './Components/Login/Login.jsx'
import Registration from './Components/Registration/Registration'
import Users from './Components/Users/Users'
function App() {

  return (
    <div className='w-full px-14 flex flex-col  justify-center items-center gap-8'>
        <div className='w-full flex gap-2 justify-end bg-black/25 '>
          <Link to='/login'>Login</Link>
          <Link to='/registration'>Registration</Link>
          <Link to='/users'>Users</Link>
        </div>
        <div className='w-full justify-center items-center'>
          <Routes>
            <Route path='/login' element={<Login/>} />
            <Route path='/registration' element={<Registration/>} />
            <Route path='/users' element={<Users/>} />

          </Routes>
        </div>
    </div>)
}

export default App
