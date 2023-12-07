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
    </>
  )
}

export default Layout
