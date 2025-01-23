import React from 'react';
import Header from './Header';
import Main from './Main';

function MyPage({ handleLogout, user }) {
    return (
        <div className='mypage-container'>
            <Header />
            <Main handleLogout={handleLogout} user={user} />
        </div>
    );
}
  
export default MyPage;