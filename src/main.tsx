import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from './Layout.tsx'
import Home from './pages/home.tsx'
import NoPage from './pages/nopage.tsx'
import SignIn from './pages/signin.tsx'
import SignUp from './pages/signup.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
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
  </React.StrictMode>,
)
