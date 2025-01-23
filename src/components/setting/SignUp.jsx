import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


function SignUp({ handleLogin, setLoginform }) {

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
        try {
            // const response = await fetch('https://recipe-backend-1er1.onrender.com/signup', {
            const response = await fetch('http://localhost:3001/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                }, 
                body: JSON.stringify(formData), 
            });
            if (response.ok) {
                console.log(response);

                const data = await response.json();
                alert(`Success!: ${data.user.username}`);
                handleLogin(data.user);
                navigate('/');
            } else {
                alert('Failed');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Server error');
        }
    }

    const toSignup = () => {
        setLoginform(true);
    }

    return (
        <div className="signup-container">
            <h1>Sign up</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <h2>Username</h2>
                    <input 
                        className='signup-input'
                        type="text"
                        name="userName"
                        value={formData.userName}
                        onChange={handleChange}>
                    </input>
                </div>
                <div>
                    <h2>Email</h2>
                    <input 
                        className='signup-input'
                        type="text"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}>
                    </input>
                </div>
                <div>
                    <h2>Password</h2>
                    <input
                        className='signup-input'
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}>
                    </input>
                </div>
                <button className='signup-continue' type='submit'>Continue</button>
                <hr />
                <h2 onClick={toSignup}>If you already have an account<span>Log in</span></h2>
                
            </form>
        </div>
    );
}
  
export default SignUp;