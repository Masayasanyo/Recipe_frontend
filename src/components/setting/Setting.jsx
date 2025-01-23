import React from 'react';
import Login from './Login';
import MyPage from './MyPage';
import SignUp from './SignUp';
import { Routes, Route, Navigate } from 'react-router-dom';
import Welcome from './Welcome';



function Setting({ isLoggedIn, handleLogin, handleLogout, user }) {
    return (
        <div className='setting'>
            <Routes>
                <Route
                    path="/"
                    element={
                        isLoggedIn ? (
                            <MyPage handleLogout={handleLogout} user={user} />
                        ) : (
                            <Navigate to="/mypage/login" replace />
                        )
                    }
                />
                <Route
                    path="/login"
                    element={<Welcome handleLogin={handleLogin} />}
                />
            </Routes>
        </div>
    );
}

export default Setting;