import './Layout.css'
import { Icon } from '@iconify/react';
import { Outlet } from 'react-router-dom'
import { NavBar } from './components/nav'
import { ModeToggle } from './components/mode-toggle'
import { Toaster } from './components/ui/sonner';

function Layout() {

  return (
    <>
      <div className="flex flex-row max-w-screen-xl mx-auto relative mb-20 z-40">
        <div className="fixed flex flex-row justify-between w-full px-10 py-2 border-b-2 border-gray-400 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-lg shadow-gray-300 dark:shadow-gray-900">
          <div className='flex flex-row items-center'>
            <Icon icon="ri:earthquake-fill" fontSize={40} />
            <span className='font-bold text-xl font-psemibold ps-2'>Earthquake Tracker</span>
          </div>
          <NavBar></NavBar>
          <ModeToggle></ModeToggle>
        </div>

      </div>
      <Outlet></Outlet>
      <Toaster />
      {/* <div className="h-[1000px] bg-gray-500"></div> */}
    </>
  )
}

export default Layout
