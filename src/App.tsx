import React, { useContext } from 'react';
import { useState } from 'react'
import './App.css'
import FirstPage from './components/pone';
import Navbar from './layouts/Navbar';
import { ThemeContext } from './context/theme';
import "./global.css"
import Footer from './components/footer';
import { RouterProvider } from 'react-router-dom';
import router from './routes/router';

function App() {
  const {theme} = useContext(ThemeContext)
  return (
    <div
      className={`app h-screen w-full mx-auto py-2 ${
        theme === "dark" ? "dark" : ""
      }`}>
        <Navbar/>
        <RouterProvider router={router} />
        <Footer/>
    </div>
  )
}

export default App
