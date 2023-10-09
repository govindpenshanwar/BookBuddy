import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Main from './Components/Main';
import './Components/style.css';
import LoginPage from './Components/LoginPage';
import SignUpPage from './Components/SignUpPge';




function App() {
  return (
    <>
    {/* <SignUpPage/> */}
    <Router>
    <Routes> 
    <Route path="/Main" element={<Main/>} />
       <Route path="/" element={<LoginPage/>} />
       <Route path="/Signup" element={<SignUpPage/>} />

        
      </Routes>
    </Router>
  
    
    </>
  );
}

export default App;
