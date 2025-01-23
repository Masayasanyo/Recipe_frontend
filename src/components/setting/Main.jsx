import React from 'react';
import { Routes, Route, Navigate} from 'react-router-dom';
import Account from './Account';


function Main({ handleLogout, user }) {
  return (
    <div className='main'>
        <Routes>
            <Route 
              path='/' 
              element={<Account handleLogout={handleLogout} user={user} />}
            />
        </Routes> 
    </div>
  );
}

export default Main;