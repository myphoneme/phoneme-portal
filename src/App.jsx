import React from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Header from './components/Header';
import Landing from './components/Landing';
import Login from './components/Login/Login';

function App() {
  return (
    <div className="min-vh-100 bg-light">
      {/* <Header />
      <Landing /> */}
      <Login/>

    </div>
  );
}

export default App;