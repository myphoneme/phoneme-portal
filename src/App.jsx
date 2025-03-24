import React from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import Header from './components/Header';
import Landing from './components/Landing';
import Login from './components/Login/Login';
import BlogList from './components/BlogList/BlogList';
import Signup from './components/Signup/Signup';
import Home from './components/Home/Home';
import Profile from './components/Profile/Profile';
import BlogDetails from './components/BlogDetail/BlogDetails';
import AppLayout from './ui/AppLayout';

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
        element: <Login/>,
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
])

function App() {
  return (
    <div className="min-vh-100 bg-light">
      {/* <Header /> */}
      {/* <Landing /> */}
      {/* <Login/> */}
      {/* <BlogList/> */}
      {/* <Signup/> */}
      {/* <Home/> */}
      {/* <Profile/> */}
      {/* <BlogDetails/> */}
      <RouterProvider router={router} />

    </div>
  );
}

export default App;