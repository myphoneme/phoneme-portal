import React from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Header from './components/Header';
import Landing from './components/Landing';
import Login from './components/Login/Login';
import BlogList from './components/BlogList/BlogList';
import Signup from './components/Signup/Signup';
import Home from './components/Home/Home';
import Profile from './components/Profile/Profile';
import BlogDetails from './components/BlogDetail/BlogDetails';


function App() {
  return (
    <div className="min-vh-100 bg-light">
      <Header />
      {/* <Landing /> */}
      {/* <Login/> */}
      {/* <BlogList/> */}
      {/* <Signup/> */}
      {/* <Home/> */}
      {/* <Profile/> */}
      <BlogDetails/>
      

    </div>
  );
}

export default App;