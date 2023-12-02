import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from './Layout.tsx'
import Home from './pages/home.tsx'
import NoPage from './pages/nopage.tsx'
import SignIn from './pages/signin.tsx'
import SignUp from './pages/signup.tsx'
import { ThemeProvider } from "@/components/theme-provider"

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
  <React.StrictMode>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Layout/>}>
        <Route index element={<Home/>}></Route>
        <Route path="home" element={<Home/>}></Route>
        <Route path="error" element={<NoPage/>}></Route>
        <Route path="signin" element={<SignIn/>}></Route>
        <Route path="signup" element={<SignUp/>}></Route>
      </Route>
    </Routes>
    </BrowserRouter>
  </React.StrictMode>
  </ThemeProvider>,
)
