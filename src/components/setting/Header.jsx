import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './styles.css'

function Header() {

    let location = useLocation()

    return (
        <div className="mypage-header">
            <Link to='/mypage' className={`mypage-link ${location.pathname === '/mypage' ? 'active-mypage' : ''}`}><h2>Account</h2></Link>
            <hr />
        </div>
    );
}

export default Header;