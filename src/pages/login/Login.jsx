import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import styles from './login.module.css';
  
function Login() {

    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
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
        event.preventDefault();
        if (formData.email !== '' && formData.password !== '') {
            try {
                const response = await fetch(`${process.env.REACT_APP_API_URL}/login`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    }, 
                    body: JSON.stringify(formData), 
                });
                if (response.ok) {
                    const data = await response.json();
                    console.log('Login success:', data);
                    login(data.data);
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

    const toSignUp = () => {
        navigate('/sign_up');
    }

    return (
        <div className={styles.loginContainer}>
            <h1>Manage your recipes</h1>
            <div className={styles.loginForm}>
                <h1>Log in</h1>
                <form onSubmit={handleSubmit}>
                    <div>
                        <div>
                            <h2>Email</h2>
                            <input 
                                type="email"
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
                    </div>
                    <button type='submit'>Continue</button>
                    <hr />
                    <h2>Don't have an account?<span onClick={toSignUp}>Sign up</span></h2>
                </form>
            </div>
        </div>
    );
}
  
export default Login;