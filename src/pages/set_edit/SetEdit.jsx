import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from './set_edit.module.css';
import RecipeList from './components/RecipeList';

function SetEdit() {

    const location = useLocation();
    const { set } = location.state || {};

    const [formData, setFormData] = useState({
        setTitle: set.name, 
        setDescription: set.description, 
    });

    const addChange = (event) => {
        let { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value, 
        });
    }

    return (
        <div className={styles.setEdit}>

            <div>
                <h1>Edit a set meal</h1>
                <form>
                    <div>
                        <div>
                            <h2>Title</h2>
                            <input 
                                type="text"
                                name="setTitle"
                                value={formData.setTitle}
                                onChange={addChange}
                            />
                        </div>
                        <div>
                            <h2>Description</h2>
                            <textarea 
                                type="text"
                                name="setDescription"
                                value={formData.setDescription}
                                onChange={addChange}
                            />
                        </div>
                        <div>
                            <RecipeList setId={set.id} />
                        </div>
                    </div>

                    <div className={styles.setEditButtonContainer}>               
                        <button type='submit' >Apply</button>
                        <button>Delete</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default SetEdit;