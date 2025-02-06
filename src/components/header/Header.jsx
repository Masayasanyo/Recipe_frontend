import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './header.module.css'

function Header() {

    let location = useLocation()

    return (
        <header>
            <div>
                <h1>Menu</h1>
            </div>
            <div className={styles['link-container']}>
                {/* <Link to='/' className={`${styles.link} ${location.pathname === '/' ? styles.active : ''}`}><h2>Home</h2></Link> */}
                <Link to='/single' className={`${styles.link} ${location.pathname === '/single' ? styles.active : ''}`}><h2>Recipes</h2></Link>
                <Link to='/set' className={`${styles.link} ${location.pathname === '/set' ? styles.active : ''}`}><h2>Set Meals</h2></Link>
                <Link to='/public_list' className={`${styles.link} ${location.pathname === '/public_list' ? styles.active : ''}`}><h2>Ideas</h2></Link>
                <Link to='/account' className={`${styles.link} ${location.pathname === '/account' ? styles.active : ''}`}><h2>Account</h2></Link>
            </div>
        </header>
    );
}

export default Header;