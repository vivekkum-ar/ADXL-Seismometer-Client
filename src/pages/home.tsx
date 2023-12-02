import { Button } from '@/components/ui/button'
import React from 'react'

interface HomeProps {
  // Add your prop types here
}

const Home: React.FC<HomeProps> = ({}) => {
  return (
    <>
    <div>Home</div>
    <Button>Click me</Button>
    </>
  )
}

export default Home