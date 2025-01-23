import React from 'react';
import { Routes, Route, Navigate} from 'react-router-dom';
import Home from './home/Home';
import MyList from './mylist/MyList';
import Setting from './setting/Setting';
import Recipe from './mylist/single/Recipe';


function Main({ isLoggedIn, handleLogin, handleLogout, user }) {
  return (
    <div className='main'>
        <Routes>
            <Route 
              path='/' 
              element={
                isLoggedIn ? (
                  <Home user={ user } />
                ) : (
                  <Navigate to="/mypage/login" replace />
                )
              }
            />
            <Route 
              path='/myList/*' 
                element={
                  isLoggedIn ? (
                    <MyList user={ user }/>
                  ) : (
                    <Navigate to="/mypage/login" replace />
                  )
                } 
            />
            <Route path='/mypage/*' element={<Setting isLoggedIn={ isLoggedIn } handleLogin={ handleLogin } handleLogout={ handleLogout } user={ user }/>} />
        </Routes> 
    </div>
  );
}

export default Main;