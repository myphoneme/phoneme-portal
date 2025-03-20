import React, { useState } from 'react';
import styles from './Login.module.css';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    alert(`Logging in with Email: ${email}`);
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
          <h2>Login to your Bizgurukul Account</h2>

          <div >
            <button className={styles.secondaryButton}>Login With Email</button>
            <button className={styles.secondaryButton}>Login With OTP</button>
            <button className={styles.secondaryButton}>Login with QR Code</button>
          </div>

          <label>Email Address</label>
          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label>Password</label>
          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <a href="#">Forgot Password?</a>

          <button onClick={handleLogin}>Login</button>

          <button className={styles.secondaryButton}>Don't have an account? Register Now</button>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
