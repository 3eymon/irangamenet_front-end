import React from 'react'
import { Outlet } from 'react-router-dom'

function AuthLayout() {
  return (
    <div className='flex flex-col justify-center w-full  items-center gap-5 z-10 h-full'>
        <div className='bg-white/5 px-10 py-8 rounded-xl relative overflow-hidden'>
        <Outlet />

        </div>
    </div>
  )
}

export default AuthLayout