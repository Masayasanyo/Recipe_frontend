import React, { useState } from 'react';
import Login from "./Login";
import SignUp from "./SignUp";
import "./styles.css"

function Welcome({handleLogin}) {

    const [loginForm, setLoginform] = useState(true);
    return (
        <div className="welcome-container">
            <div className="welcome-message">
                <h1>Manage your recipes</h1>
            </div>
            {loginForm ? (
                <Login handleLogin={handleLogin} setLoginform={setLoginform} />
            ):(
                <SignUp handleLogin={handleLogin} setLoginform={setLoginform} />
            )}
        </div>
    );
}


export default Welcome;