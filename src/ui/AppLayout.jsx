import React from 'react';
import Header from "../components/Header"
import { Outlet , useLocation} from "react-router-dom"
import { Footer } from '../components/Footer/Footer';

const AppLayout = () => {
  const location = useLocation();
  const hideHeaderAndFooter = location.pathname === "/login" || location.pathname === "/signup";
  return (
    <>
      <div>
        {/* <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} /> */}
        {/* <Header/> */}
        {!hideHeaderAndFooter && <Header />}
        <Outlet />  
        {/* <Footer/> */}
        {!hideHeaderAndFooter && <Footer />}
    </div>
    </>
  )
}

export default AppLayout