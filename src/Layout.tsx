import './Layout.css'
import { Outlet, useNavigate } from 'react-router-dom'
import { NavigationBar } from './components/nav'
import { Toaster } from './components/ui/sonner';

function Layout() {
  return (
    <>
      <NavigationBar/>
      <Outlet />
      <Toaster />
      {/* <div className="h-[1000px] bg-gray-500"></div> */}
    </>
  )
}

export default Layout
