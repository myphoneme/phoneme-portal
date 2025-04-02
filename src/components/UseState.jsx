import React, { useState, useContext } from "react";
import { globalContext } from "../Context"; // ✅ Import globalContext
import styles from "./UseState.module.css";
import { globalContext } from "../Context"; 

function UseStatePage() {
    
  const { mode } = useContext(globalContext); // 🌗 Access mode from context
  const [count, setCount] = useState(0);

  const increment = () => setCount(count + 1);
  const decrement = () => setCount(count - 1);
  const reset = () => setCount(0);

  return (
    <div
      className={`${styles.container} ${
        mode === "light" ? styles.lightMode : styles.darkMode
      }`}
    >
      <h2 className={mode === "light" ? "text-black" : "text-red-500"}>
        useState Hook Demo
      </h2>
      <div className={styles.counterBox}>
        <p
          className={`text-xl font-bold ${
            mode === "light" ? "text-indigo-600" : "text-aqua-400"
          }`}
        >
          Count: {count}
        </p>
        <div className={styles.btnGroup}>
          <button
            onClick={increment}
            className={`btn ${
              mode === "light" ? "btn-primary" : "btn-outline-info"
            }`}
          >
        
          </button>
          <button
            onClick={decrement}
            className={`btn ${
              mode === "light" ? "btn-warning" : "btn-outline-danger"
            }`}
          >
        
          </button>
          <button
            onClick={reset}
            className={`btn ${
              mode === "light" ? "btn-secondary" : "btn-outline-light"
            }`}
          >
            
          </button>
        </div>
      </div>
    </div>
  );
}

export default UseStatePage;