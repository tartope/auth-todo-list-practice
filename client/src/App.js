import React, { Fragment, useState, useEffect } from 'react';
import './App.css';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

//components
import Dashboard from './components/dashboard/Dashboard';
import Login from './components/Login';
import Register from './components/Register';
import Landing from './components/Landing';

function App() {

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const setAuth = (boolean) => {
    setIsAuthenticated(boolean);
  };

  async function isAuth(){
    try {

      const response = await fetch('http://localhost:3000/auth/is-verify', {
        method: 'GET',
        headers: {token: localStorage.token}
      })

      const parseRes = await response.json();

      parseRes === true ? setIsAuthenticated(true) : setIsAuthenticated(false);
      
    } catch (err) {
        console.error(err.message);
    }
  }

  useEffect(() => {
    isAuth()
  },[])

  return (
    <Fragment>
      <Router>
        <div className="container">
          <Routes>
            {/* anytime you pass props to a component, you don't want it to remount, so 'render' helps in this type of situation */}
            <Route 
              exact 
              path="/login" 
              element={ !isAuthenticated ? (<Login setAuth={setAuth}/>) : (<Navigate to="/dashboard"/>)} />
            <Route exact path="/register" element={!isAuthenticated ? (<Register setAuth={setAuth}/>) : <Navigate to="/dashboard"/>}/>
            <Route exact path="/dashboard" element={isAuthenticated ? (<Dashboard setAuth={setAuth}/>) : ( <Navigate to="/login"/>)}/>
            <Route 
              exact 
              path="/" 
              element={ !isAuthenticated ? (<Landing setAuth={setAuth}/>) : (<Navigate to="/dashboard"/>)} />
          </Routes>
        </div>
      </Router>
      <ToastContainer />
    </Fragment>
  );
}

export default App;
