import React, { useState } from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from './Layout.tsx'
import Home from './pages/home.tsx'
import NoPage from './pages/nopage.tsx'
import {SignIn} from './pages/signin.tsx'
import { ThemeProvider } from "@/components/theme-provider"
import { SignUp } from './pages/signup.tsx'
import { UserContext } from './userContext.ts'
import Protected from './protectedHoc.tsx'
import { set } from 'react-hook-form'
import { auth } from './firebase.ts'

interface MainProps {
  // Add your prop types here
}

const Main: React.FC<MainProps> = ({ }) => {
  const [user, setUser] = useState(null);

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <UserContext.Provider value={{ user, setUser }}>
        <React.StrictMode>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={
                  <Protected><Home /></Protected>
                }></Route>
                <Route path="home" element={
                  <Protected><Home /></Protected>
                }></Route>
                <Route path="*" element={<NoPage />}></Route>
                <Route path="signup" element={<SignUp />}></Route>
                <Route path="signin" element={<SignIn />}></Route>
              </Route>
            </Routes>
          </BrowserRouter>
        </React.StrictMode>
      </UserContext.Provider>
    </ThemeProvider>
  )
}

export default Main
ReactDOM.createRoot(document.getElementById('root')!).render(
  <Main></Main>
)
