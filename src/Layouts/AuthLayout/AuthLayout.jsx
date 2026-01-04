import React from 'react'
import { Outlet } from 'react-router-dom'


export default function AuthLayout() {
  return <>
  <main className='gradient'>
    <div className="grid grid-cols-4">
      
      <div className="col-span-4 flex justify-center items-center">
        <Outlet/>
        
      </div>
    </div>
  </main>
 
  </>
}
