import React, { useContext } from "react";
import { Pen, Github, Twitter } from "lucide-react";
import { Container } from "react-bootstrap";
import { globalContext } from "../Context"; // ✅ Import globalContext
import styles from "./Footer.module.css";

export function Footer() {
  const { mode } = useContext(globalContext); // 🌗 Access mode from context
  // alert(mode);
  return (
    <footer
   // bg={mode === 'light' ? 'white' : 'dark'}
      //className={`${styles.mainFoot} ${styles.darkMode} ${styles.lightMode}`}
      // className={`shadow-sm sticky-top z-index-999 ${mode === 'dark' ? 'navbar-dark' : ''}`}
      className={ mode === 'light' ? "bg-light text-dark" : "bg-dark text-light"}
    >
      <Container>
        <div className={styles.mainFooter}>
          <div className="flex items-center gap-2">
            <Pen
              size={18}
              className={mode === "light" ? "text-indigo-600" : "text-aqua-400"} // 🎨 Icon color change
            />
            <span
              className={`text-xl font-semibold ${
                mode === "light" ? "text-gray-900" : "text-red-500"
              }`}
            >
              DevBlog
            </span>
          </div>

          {/* Social Media Links */}
          {/* <div className="">
            <a href="#" className={styles.footIcon}>
              <Github size={20} />
            </a>
            <a href="#" className={styles.footIcon}>
              <Twitter size={20} />
            </a>
          </div> */}

          <div>
            <p
              className={`text-sm ${
                mode === "light" ? "text-gray-500" : "text-gray-300"
              }`}
            >
              © 2024 DevBlog. All rights reserved.
            </p>
          </div>
        </div>
      </Container>
    </footer>
  );
}



// import React from 'react';
// import { Pen, Github, Twitter } from 'lucide-react';
// import { Container} from 'react-bootstrap';
// import styles from './Footer.module.css';

// export function Footer() {
//   return (
//     <footer className={styles.mainFoot}>
//         <Container >
        
//       <div className={styles.mainFooter}>
//           <div className="flex items-center gap-2">
//             <Pen size={18} className="text-indigo-600" />
//             <span className="text-xl font-semibold text-gray-900">DevBlog</span>
//           </div>
//           {/* <div className="">
//             <a href="#" className={styles.footIcon}>
//               <Github size={20} />
//             </a>
//             <a href="#"className={styles.footIcon}>
//               <Twitter size={20} />
//             </a>
//           </div> */}
//           <div>
//           <p className="text-sm text-gray-500">
//             © 2024 DevBlog. All rights reserved.
//           </p>
//           </div>
//       </div>
//       </Container>
//     </footer>
//   );
// }