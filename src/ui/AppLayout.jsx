import React from 'react';
import Header from "../components/Header"
import { Outlet } from "react-router-dom"

const AppLayout = () => {
  return (
    <>
      <div>
        {/* <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} /> */}
        <Header/>
        <Outlet />  
    </div>
    </>
  )
}

export default AppLayout