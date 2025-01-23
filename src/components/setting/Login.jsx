import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
  
function Login({ handleLogin, setLoginform}) {

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
        try {
            // const response = await fetch('https://recipe-backend-1er1.onrender.com/login', {
            const response = await fetch('http://localhost:3001/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                }, 
                body: JSON.stringify(formData), 
            });
            if (response.ok) {
                const data = await response.json();
                console.log(data);
                alert(`Success!: ${data.data.email}`);
                handleLogin(data.data);
                navigate('/');
            } else {
                alert('Failed');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Server error');
        }
    }

    const toLogin = () => {
        setLoginform(false);
    }

    return (
        <div className="login-container">
            <h1>Log in</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <div>
                        <h2>Email</h2>
                        <input 
                            className='login-input'
                            type="text"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}>
                        </input>
                    </div>
                    <div>
                        <h2>Password</h2>
                        <input
                            className='login-input'
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}>
                        </input>
                    </div>
                </div>
                <button className='login-continue' type='submit'>Continue</button>
                <hr />
                <h2>Don't have an account?<span onClick={toLogin}>Sign up</span></h2>
                {/* <h3 onClick={toLogin} >Sign up</h3> */}
                {/* <Link to='/setting/signup'>Sign up</Link> */}
                
            </form>
        </div>
    );
}
  
export default Login;