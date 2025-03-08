import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Layout from './components/auth/Layout'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
const App = () => {
  return (
    <div className='flex flex-col overflow-hidden bg-white'>
      <h1>Header Component</h1>

      <Routes>
        <Route path='/auth' element={<Layout />}>
          <Route path='login' element={<Login />} />
          <Route path='register' element={<Register />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App