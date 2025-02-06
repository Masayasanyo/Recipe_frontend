import React, { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import styles from './home.module.css';

function Home() {

    const { user } = useContext(AuthContext);

    return (
        <div className={styles.homeContainer}>
            <h1>Home</h1>
            <h2>Welcome {user.username}</h2>
        </div>
    )
}

export default Home;