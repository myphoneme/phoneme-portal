import React from 'react';
import Header from "../components/Header"
import { Outlet } from "react-router-dom"

const AppLayout = ({ isLoggedIn, setIsLoggedIn }) => {
  return (
    <>
      <div>
        <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
        <Outlet />  
    </div>
    </>
  )
}

export default AppLayout