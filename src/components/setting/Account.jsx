import React, { useState } from 'react';


function Account({user, handleLogout, handleLogin, setLoginform}) {

    const [formData, setFormData] = useState({
        userName: user.username, 
        email: user.email, 
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
            // const response = await fetch('https://recipe-backend-1er1.onrender.com/account', {
            const response = await fetch('http://localhost:3001/account', {
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
        <div className='account-container' >
            <h1>Account</h1>

            <form onSubmit={handleSubmit}>
                <h2>Username</h2>
                <input
                    className='username-edit'
                    type="text"
                    name="username"
                    value={formData.userName}
                    onChange={handleChange}>
                </input>
            </form>

            <hr />

            <form onSubmit={handleSubmit}>
                <h2>Email</h2>
                <input 
                    className='email-edit'
                    type="text"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}>
                </input>
                <button>Update email address</button>
            </form>

            <hr />

            <form onSubmit={handleSubmit}>
                <h2>Password</h2>
                <input 
                    className='password-edit'
                    type="text"
                    name="password" 
                    placeholder='New password'
                    onChange={handleChange}>
                </input>
                <input 
                    className='password-edit-confirm'
                    type="text"
                    name="password" 
                    placeholder='Confirm password'
                    onChange={handleChange}>
                </input>
                <button>Update password</button>
            </form>

            <hr />

            <div className='profile-button'>
                <button className='logout-button' onClick={handleLogout} >Log out</button>
            </div>




        </div>
    )
}

export default Account;