import React from 'react';
import { useState } from 'react';
import "./Signup.css";
import Navbar from './Navbar';
import { useNavigate  } from 'react-router-dom';
import axios from 'axios';


function SignUpPage() {
    // const navigate = useNavigate();
    // const LoginBtn = () => {
    //     navigate("/Main")
    //   }


    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    console.log(formData);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    
    const baseURL = 'http://localhost:5000'; // Define the baseURL

const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        const response = await axios.post(`${baseURL}/api/registerSignUp-data`, formData, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.status === 201) {
            // User registered successfully, navigate to the main page
            navigate('/Main');
        } else {
            // Handle errors here, e.g., display an error message to the user
            console.error('Registration failed');
        }
    } catch (error) {
        console.error(error);
    }
};




    return(<>

    <Navbar/>
    
    <form className="form" action='/Signup'  onSubmit={handleSubmit}>
    <p className="title">Register </p>
    <p className="message">Signup now and get full access to our app. </p>
        <div className="flex">
        <label>
            <input className="input" type="text" placeholder="" required="" name='firstname'
            value={formData.firstname}
            onChange={handleInputChange}
            />
            <span>firstname</span>
        </label>

        <label>
            <input className="input" type="text" placeholder="" required="" name='lastname'
            value={formData.lastname}
            onChange={handleInputChange}
            />
            <span>lastname</span>
        </label>
    </div>  
            
    <label>
        <input className="input" type="email" placeholder="" required="" name='email' autoComplete='current-email'
        value={formData.email}
        onChange={handleInputChange}/>
        <span>Email</span>
    </label> 
        
    <label>
        <input className="input" type="password" placeholder="" required="" name='password'
        value={formData.password}
        onChange={handleInputChange}/>
        <span>Password</span>
    </label>
    <label>
        <input className="input" type="password" placeholder="" required="" name='confirmPassword'
        value={formData.confirmPassword}
        onChange={handleInputChange}/>
        <span>Confirm password</span>
    </label>
    <button className="submit" >Submit</button>
    {/* onClick={LoginBtn} */}
</form>
    
    
    </>);
}

export default SignUpPage;