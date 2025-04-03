import React, { useState, useEffect } from 'react';
import styles from './FlashMessage.module.css';

const FlashMessage = ({ message, type, onClose }) => {
  if (!message) return null;

  // Auto-hide the message after 3 seconds
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        if (onClose) onClose();
      }, 3000); 
      return () => clearTimeout(timer);
    }
  }, [message, onClose]);

  return (
    <div className={`${styles.flashMessage} ${styles[type]}`}> 
      <span>{message}</span>
      {/* {onClose && (
        <button className={styles.closeBtn} onClick={onClose}>×</button>
      )} */}
    </div>
  );
};

const App = () => {
  const [flash, setFlash] = useState({ message: "", type: "" });

  const handleAction = (actionType) => {
    try {
      let message = "";
      let type = "";
      switch (actionType) {
        case "add":
          message = "Item added successfully!";
          type = "add";
          break;
        case "update":
          message = "Item updated successfully!";
          type = "update";
          break;
        case "delete":
          message = "Item deleted successfully!";
          type = "delete";
          break;
        default:
          message = "Operation completed!";
          type = "success";
      }
      setFlash({ message, type });
    } catch (error) {
      setFlash({ message: "An error occurred!", type: "error" });
    }
  };

  return (
    <div className={styles.container}>
      <FlashMessage 
        message={flash.message} 
        type={flash.type} 
        onClose={() => setFlash({ message: "", type: "" })} 
      />
      <div className={styles.buttonGroup}>
        <button onClick={() => handleAction("add")} className={`${styles.btn} ${styles.add}`}>Add</button>
        <button onClick={() => handleAction("update")} className={`${styles.btn} ${styles.update}`}>Update</button>
        <button onClick={() => handleAction("delete")} className={`${styles.btn} ${styles.delete}`}>Delete</button>
      </div>
    </div>
  );
};

export default { FlashMessage, App };

export { FlashMessage }


// import { useState } from "react";
// import styles from "./FlashMessage.module.css";

// const FlashMessage = ({ message, type, onClose }) => {
//   if (!message) return null;

//   return (
//     <div className={`${styles.flashMessage} ${styles[type]}`}> 
//       <span>{message}</span>
//       <button className={styles.closeBtn} onClick={onClose}>×</button>
//     </div>
//   );
// };

// const App = () => {
//   const [flash, setFlash] = useState({ message: "", type: "" });

//   const handleAction = (actionType) => {
//     try {
//       let message = "";
//       let type = "";
//       switch (actionType) {
//         case "add":
//           message = "Item added successfully!";
//           type = "add";
//           break;
//         case "update":
//           message = "Item updated successfully!";
//           type = "update";
//           break;
//         case "delete":
//           message = "Item deleted successfully!";
//           type = "delete";
//           break;
//         default:
//           message = "Operation completed!";
//           type = "success";
//       }
//       setFlash({ message, type });
//     } catch (error) {
//       setFlash({ message: "An error occurred!", type: "error" });
//     }
//   };

//   return (
//     <div className={styles.container}>
//       <FlashMessage message={flash.message} type={flash.type} onClose={() => setFlash({ message: "", type: "" })} />
//       <div className={styles.buttonGroup}>
//         <button onClick={() => handleAction("add")} className={`${styles.btn} ${styles.add}`}>Add</button>
//         <button onClick={() => handleAction("update")} className={`${styles.btn} ${styles.update}`}>Update</button>
//         <button onClick={() => handleAction("delete")} className={`${styles.btn} ${styles.delete}`}>Delete</button>
//       </div>
//     </div>
//   );
// };

// export default App;


