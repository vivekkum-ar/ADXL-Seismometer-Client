import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './Layout.css'
import { Outlet } from 'react-router-dom'

function Layout() {

  return (
    <>
    <Outlet></Outlet>
    </>
  )
}

export default Layout
