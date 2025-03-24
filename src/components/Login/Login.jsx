import React, { useState } from 'react';
import styles from './Login.module.css';
import { FaGoogle } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../../config';

function LoginPage({setIsLoggedIn}) {

  const[loginData , setLoginData] = useState({
    email: "",
    password: ""
  });
  
  
  const handleInputChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };
  
  const navigate = useNavigate();

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
      try {
        const response = await fetch(`${API_URL}login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: new URLSearchParams({
            username: loginData.email,
            password: loginData.password,
          }),
        })
  
          .then((response) => {
            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
          })
          .then((data) => {
            console.log("Response Data:", data);
            if (data.access_token) {
              localStorage.setItem("accessToken", data.access_token);
              setIsLoggedIn(true);
              if (data.user && data.user.id) {
                localStorage.setItem("userId", data.user.id);  // Store user ID   ronik 
              }
              navigate("/home");
              console.log("user id of the user is : ",data.user.id);//ronik
            } else {
              console.error("Token not found in response");
            }
          })
          .catch((error) => {
            console.error("Error during fetch:", error);
          });
      } catch (e) {
        console.log("Something Went Wrong " + e);
      }
  
      console.log(loginData);
    };
  return (
    <div className={styles.appContainer}>
      
      {/* Left Section */}
      <div className={styles.leftSection}>
        <img src="https://www.bizgurukul.com/Biz/img/biz_image/login_slide2.svg" alt="Training Illustration" />
        <h2>We Train</h2>
        <p>To empower with the practical skills and knowledge you need to succeed in your chosen field.</p>
      </div>

      {/* Right Section */}
      <div className={styles.rightSection}>
        <div className={styles.formContainer}>
          <h2 className='text-center'>Login to your Account</h2>
          {/* <div className={styles.mainParent}>
            <button className={styles.secondaryButton}>Login With Email</button>
            <button className={styles.secondaryButton}>Login With OTP</button>
            <button className={styles.secondaryButton}>Login with QR Code</button>
          </div> */}

          <label>Email Address</label>
          <input
            type="email"
            placeholder="Enter Email"
            value={loginData.email}
            onChange={handleInputChange}
            name='email'
            required
          />

          <label>Password</label>
          <input
            type="password"
            placeholder="Enter Password"
            value={loginData.password}
            onChange={handleInputChange}
            name='password'
            required
          />

          <a href="#" >Forgot Password?</a>

         <div className={styles.loginBtn}>
          <button onClick={handleLoginSubmit} className={styles.secondaryButton}>Login</button>
          <button className={`${styles.secondaryButton} ${styles.regClass}`}>Don't have an account? Register Now</button>
         </div>
         <div className='text-center'>or</div>
         <button className={styles.googbtn}> <FaGoogle /> Sign in with Google</button>

        </div>
      </div>
    </div>
  );
}

export default LoginPage;
