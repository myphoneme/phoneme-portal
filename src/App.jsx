import React, { useState ,useEffect } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header';
import Landing from './components/LandingHome/Landing';
import Login from './components/Login/Login';
import BlogList from './components/BlogList/BlogList';
import Signup from './components/Signup/Signup';
import Home from './components/Home/Home';
import Profile from './components/Profile/Profile';
import BlogDetails from './components/BlogDetail/BlogDetails';
import AppLayout from './ui/AppLayout';
  

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  const router = createBrowserRouter([
  {
    element: <AppLayout/>,
    children:[
      { 
        path: '/',
        element: <Landing/>,
      },
      {
        path: 'login',
        element: <Login  setIsLoggedIn={setIsLoggedIn} />,
      },
      {
        path: 'signup',
        element: <Signup/>,
      },
      {
        path: 'home',
        element: <Home/>
      },
      {
        path: 'profile',
        element: <Profile/>,
      },
      {
        path: 'list',
        element: <BlogList/>,
      },
      {
        path: 'details',
        element: <BlogDetails/>
      }

    ]
  }
]);


  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  return ( 
    <div className="min-vh-100 bg-light">
      {/* <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} /> */}
      <RouterProvider router={router} />

    </div>
  );
}

export default App;