import { Button } from '@/components/ui/button'
import { Icon } from '@iconify/react/dist/iconify.js'
import React from 'react'
import { useNavigate } from 'react-router-dom'

interface ProtectedProps {
  // Add your prop types here
}

const NotProtected: React.FC<ProtectedProps> = ({}) => {
    const navigate = useNavigate();
  return (
    <div className='max-w-screen-lg mx-auto flex flex-col justify-center items-center h-[80vh]'>
        <div className="max-w-screen-sm mx-auto relative">
    <div className='absolute h-full w-full flex flex-col justify-center items-center rounded-lg outline p-6 bg-slate-200 dark:bg-slate-700 shadow-lg shadow-white dark:shadow-slate-700 opacity-35'>
        
    </div>
    <div className='relative max-w-screen-sm mx-auto flex flex-col justify-center items-center rounded-lg outline p-6'>
        <div className='flex flex-row items-center'>
            <Icon icon="ri:earthquake-fill" fontSize={35} />
            <span className='font-bold text-xl font-psemibold ps-2 text-violet-500'>Earthquake</span> 
            <span className='font-bold text-xl font-psemibold ps-2'>Tracker</span>
          </div>
          <span className='font-pregular my-4'>
            Please sign in to access this page
          </span>
        <span className='text-gray-500 text-sm text-center'> Click on the button below to continue</span>
    <Button className='my-6' onClick={() => navigate("/signin")}>Sign in</Button>
    </div>
    </div>
    </div>
  )
}

export default NotProtected