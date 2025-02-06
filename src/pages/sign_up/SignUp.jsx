import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import styles from './sign_up.module.css';


function SignUp() {

    const { login } = useContext(AuthContext);

    const navigate = useNavigate();
    
    const [formData, setFormData] = useState({
        userName: "", 
        email: "", 
        password: "",
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value, 
        });
    }
    
    const handleSubmit = async (event) => {
        console.log("Form submitted");
        event.preventDefault();
        if (formData.userName !== '' && formData.email !== '' && formData.password !== '') {
            try {
                const response = await fetch(`${process.env.REACT_APP_API_URL}/signup`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    }, 
                    body: JSON.stringify(formData), 
                });
                if (response.ok) {
                    const data = await response.json();
                    console.log('Sign up success:', data);
                    login(data.user);
                    navigate('/');
                } else {
                    alert('Failed');
                }
            } catch (error) {
                console.error('Error:', error);
                alert('Server error');
            }
        }
        else {
            alert('Please provide a valid input!');
        }
    }

    const toLogin = () => {
        navigate('/login');
    }

    return (
        <div className={styles.signUpContainer}>
            <h1>Manage your recipes</h1>
            <div className={styles.signUpForm}>
                <h1>Sign up</h1>
                <form onSubmit={handleSubmit}>
                    <div>
                        <h2>Username</h2>
                        <input 
                            type="text"
                            name="userName"
                            value={formData.userName}
                            onChange={handleChange}>
                        </input>
                    </div>
                    <div>
                        <h2>Email</h2>
                        <input 
                            type="text"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}>
                        </input>
                    </div>
                    <div>
                        <h2>Password</h2>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}>
                        </input>
                    </div>
                    <button type='submit'>Continue</button>
                    <hr />
                    <h2 onClick={toLogin}>If you already have an account<span>Log in</span></h2>
                    
                </form>
            </div>
        </div>
    );
}
  
export default SignUp;