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
import { ForgotPassword } from './pages/forgotPassword.tsx'
import {EditProfile} from './pages/editProfile.tsx'

interface MainProps {
  // Add your prop types here
}

const Main: React.FC<MainProps> = ({ }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [fcmToken, setFcmToken] = useState("");

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <UserContext.Provider value={{ user, setUser ,isLoading, setIsLoading, fcmToken, setFcmToken}}>
        <React.StrictMode>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={
                  <SignIn />
                }></Route>
                <Route path="home" element={
                  <Protected><Home /></Protected>
                }></Route>
                <Route path="editprofile" element={
                  <Protected><EditProfile /></Protected>
                }></Route>
                <Route path="*" element={<NoPage />}></Route>
                <Route path="signup" element={<SignUp />}></Route>
                <Route path="signin" element={<SignIn />}></Route>
                <Route path="forgotpassword" element={<ForgotPassword />}></Route>
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
