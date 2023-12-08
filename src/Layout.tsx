import './Layout.css'
import { Outlet } from 'react-router-dom'
import { NavigationBar } from './components/nav'
import { Toaster } from './components/ui/sonner';
import { useEffect, useState } from 'react';
import Loading from './components/modalLoading';

function Layout() {
  const [isFirst, setIsFirst] = useState(true);
  useEffect(() => {
    if (isFirst == false) {
      return;
    }
    setTimeout(() => {
      setIsFirst(false);
    }, 3000);
  }, []);
  return (
    <>
    {isFirst && <Loading/>}
      <NavigationBar/>
      <Outlet />
      <Toaster />
    </>
  )
}

export default Layout
