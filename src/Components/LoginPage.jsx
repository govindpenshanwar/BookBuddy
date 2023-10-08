import React , { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import './loginpage.css';
import Navbar from './Navbar';
import axios from 'axios';

function LoginPage(){
  // {onRegistrationSuccess}
    const navigate = useNavigate(); // Initialize useHistory
    const [registrationError, setRegistrationError] = useState('');
    const handleRegistrationSuccess = () => {
      navigate("/Main");
    };



const handleButtonClick = async () => {
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

 
  try {
    const baseURL = 'http://localhost:5000'; // Adjust the URL to match your server configuration
    const response = await axios.post(`${baseURL}/api/register`, {
      username,
      password,
    });
    
    console.log("Username : " , username);
    console.log("Password" , password);

    if (response.status === 201) {
      alert('User registered successfully');
      console.log(response);
      // Redirect to another page or perform other actions as needed
      // handleRegistrationSuccess();
      navigate('/Main')
    } else {
      alert('Registration failed');
    }
    
  } catch (error) {
    console.error(error);
    alert(error);
    setRegistrationError('Registration failed. Please try again.');
  }
};


    return(<>
    <Navbar/>
    <form action="/" className="form_main">
    <img src="./images/b67.png" alt="" width="180px" height="180px"/>
    <p className="heading">Login Here</p>
    <div className="inputContainer">
        <svg className="inputIcon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#2e2e2e" viewBox="0 0 16 16">
        <path d="M13.106 7.222c0-2.967-2.249-5.032-5.482-5.032-3.35 0-5.646 2.318-5.646 5.702 0 3.493 2.235 5.708 5.762 5.708.862 0 1.689-.123 2.304-.335v-.862c-.43.199-1.354.328-2.29.328-2.926 0-4.813-1.88-4.813-4.798 0-2.844 1.921-4.881 4.594-4.881 2.735 0 4.608 1.688 4.608 4.156 0 1.682-.554 2.769-1.416 2.769-.492 0-.772-.28-.772-.76V5.206H8.923v.834h-.11c-.266-.595-.881-.964-1.6-.964-1.4 0-2.378 1.162-2.378 2.823 0 1.737.957 2.906 2.379 2.906.8 0 1.415-.39 1.709-1.087h.11c.081.67.703 1.148 1.503 1.148 1.572 0 2.57-1.415 2.57-3.643zm-7.177.704c0-1.197.54-1.907 1.456-1.907.93 0 1.524.738 1.524 1.907S8.308 9.84 7.371 9.84c-.895 0-1.442-.725-1.442-1.914z"></path>
        </svg>
    {/* <input type="text" className="inputField" id="username" placeholder="Username" name='username'/> */}
    
    <input type="text" className="inputField" id="username" placeholder="Username" name='username' autoComplete='username'/>
    </div>
    
<div className="inputContainer">
    <svg className="inputIcon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#2e2e2e" viewBox="0 0 16 16">
    <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z"></path>
    </svg>
    <input type="password" className="inputField" id="password" placeholder="Password" name='password' autoComplete='current-password' ></input>
</div>
             {/* <button id="button">Submit</button> */}
           

             
          <button type='Submit' id="button" onClick={handleRegistrationSuccess} >Submit</button>
           
    <a className="forgotLink" >Forgot your password?</a>

    {registrationError && <p className="error-message">{registrationError}</p>}

</form>



    </>

    );
}

export default LoginPage;