import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../context/AuthContext';
import styles from '../set.module.css';

function SetCreate({setIsSetAdding}) {

    const navigate = useNavigate();

    const { user } = useContext(AuthContext);

    const [formData, setFormData] = useState({
        title: "", 
        description: "", 
    });

    const addChange = (event) => {
        let { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value, 
        });
    }

    const addCancelSet  = () => {
        setIsSetAdding(false);
    }

    const addSubmit  = async (event) => {

        event.preventDefault();

        try {
            const data = {"accountId": user.id, "title": formData.title, "description": formData.description}
            const response = await fetch(`${process.env.REACT_APP_API_URL}/set/create`, {
                method: 'POST', 
                headers: {
                    'Content-Type': 'application/json',
                }, 
                body: JSON.stringify(data), 
            });
            if (response.ok) {
                const data = await response.json();
                window.location.reload();
            } else {
                console.log('Failed');
            }
        } catch (error) {
            console.error('Error:', error);
            console.log('Server error');
        }

        setFormData({
            title: "", 
            description: "", 
        });

        setIsSetAdding(false);
    }
    
    return (
        <div className={styles.setCreate} >
            <div className={styles.setCreateHeader} >
                <h1>Create a new Set Meal</h1>
                <button onClick={addCancelSet} >×</button>
            </div>
            <form className={styles.setCreateMain} onSubmit={addSubmit} >
                <div>
                    <h2>Title</h2>
                    <input
                        name='title'
                        placeholder="title"
                        onChange={addChange}
                     />
                </div>
                <div>
                    <h2>Description</h2>
                    <textarea
                        name='description'
                        placeholder="description"
                        onChange={addChange}
                     />
                </div>
                <button className={styles.setSave} type='submit' >Save</button>
            </form>
        </div>
    )
}

export default SetCreate;