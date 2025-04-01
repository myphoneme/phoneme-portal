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
import CategoriesList from './components/CategoriesList/CategoriesList';
import Auth from './auth';
import { SignedIn, SignedOut } from '@clerk/clerk-react';
import { Footer } from './components/Footer/Footer';
import CreateBlog from './components/CreateBlog/CreateBlog';

function App() {
  
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
        element: <Auth/>
      },
      {
        path: 'signup',
        element: <Signup/>,
      },
      {
        path: 'home',
        element: (
          <SignedIn>
            <Home />
          </SignedIn>
        ),
      },
      {
        path: 'profile',
        element: (
          <SignedIn>
            <Profile />
          </SignedIn>
        ),
      },
      {
        path: 'list',
        element: (
          <SignedIn>
            <BlogList />
          </SignedIn>
        ),
      },
      {
        path: 'details/:id',
        element: (
          <SignedIn>
            <BlogDetails />
          </SignedIn>
        ),
      },
      {
        path: 'categorieslist',
        element: (
          <SignedIn>
            <CategoriesList />
          </SignedIn>
        ),
      }
      ,
      {
        path: 'createBlog',
        element: (
          <SignedIn>
            <CreateBlog/>
          </SignedIn>
        ),
      },
      {
        path: 'createBlog/:id', // ✅ Dynamic Route for Editing
        element: (
          <SignedIn>
            <CreateBlog />
          </SignedIn>
        ),
      },

    ]
  }
]);


  // useEffect(() => {
  //   const token = localStorage.getItem('accessToken');
  //   if (token) {
  //     setIsLoggedIn(true);
  //   }
  // }, []);

  return ( 
    <div className="min-vh-100 bg-light">
      {/* <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} /> */}
      <RouterProvider router={router} />
      <Footer/>
    </div>
  );
}

export default App;