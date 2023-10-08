import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Main from './Components/Main';
import './Components/style.css';
import LoginPage from './Components/LoginPage';




function App() {
  return (
    <>
    <Router>
    <Routes> 
    <Route path="/Main" element={<Main/>} />
       <Route path="/" element={<LoginPage/>} />
        
      </Routes>
    </Router>
  
    
    </>
  );
}

export default App;
