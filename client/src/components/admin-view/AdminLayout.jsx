
import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from './Header'
import Sidebar from './Sidebar'
import { useState } from 'react'
const AdminLayout = () => {
  const [openSidebar, setOpenSidebar] = useState(false)
  return (
    <div className='flex min-h-screen w-full'>
        {/* Admin Sidebar */}
        <Sidebar open={openSidebar} setOpen={setOpenSidebar} />
        <div className='flex flex-1 flex-col'>
            {/* Admin Header */}
            <Header setOpen={setOpenSidebar}/>
            <main className='flex flex-1 bg-muted/40 p-4 md:p-6'>
                <Outlet />
            </main>
        </div>
    </div>
  )
}

export default AdminLayout