import React, { useState, useContext, useEffect } from 'react';
import SetCreate from "./components/SetCreate";
import SetDetail from './components/Setdetail';
import { AuthContext } from '../../context/AuthContext';
import styles from './set.module.css';
import { useNavigate } from 'react-router-dom';


function Set () {

    const { user } = useContext(AuthContext);
    const [setList, setSetList] = useState([]);
    const [isSetAdding, setIsSetAdding] = useState(false);
    const addSet  = () => {
        setIsSetAdding(!isSetAdding);
    }

    const navigate = useNavigate();

    const openSet = (set) => {
        navigate("/set_edit", { state: { set } });
    };

    useEffect(() => {
        const fetchSets  = async () => {
            try {
                const data = {"accountId": user.id}
                const response = await fetch(`${process.env.REACT_APP_API_URL}/set/all`, {
                    method: 'POST', 
                    headers: {
                        'Content-Type': 'application/json',
                    }, 
                    body: JSON.stringify(data), 
                });
                if (response.ok) {
                    const data = await response.json();
                    setSetList(data.set);
                } else {
                    console.log('Failed');
                }
            } catch (error) {
                console.error('Error:', error);
                console.log('Server error');
            }
        };
        fetchSets();
    }, []);

    return (
        <div className={styles.setContainer}>

            <div className={styles.setHeader} >
                <button onClick={addSet} >+</button>
                {isSetAdding && (
                    <SetCreate setIsSetAdding={setIsSetAdding} />
                )}
            </div>

            <div className={styles.setList} >
                {setList.length > 0 ? (
                setList.map((set, index) => (
                <SetDetail set={set} key={index} openSet={openSet} />
                ))
                ) : (
                    <p>No Set Meals</p>
                )}
            </div>

        </div>
    ); 
}

export default Set;