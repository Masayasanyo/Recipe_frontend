import React, { useEffect, useState, useContext } from 'react';
import styles from './detail.module.css';

function SetDetail({set, openSet}) {

    const [myList, setMyList] = useState([]);

    useEffect(() => {
        const fetchRecipes = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_API_URL}/set/recipe_list`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    }, 
                    body: JSON.stringify({"set_id": set.id}), 
                });
                if (response.ok) {
                    const data = await response.json();
                    setMyList(data.recipeList);
                } else {
                    console.log('Failed');
                }
            } catch (error) {
                console.error('Error:', error);
                console.log('Server error');
            }
        };
        fetchRecipes();
    }, []);

    const handleClick = () => {
        openSet(set);
    };

    return (
        <div className={styles.setDetail} onClick={handleClick}>
            <h1>{set.name}</h1>
            <hr />
            <div className={styles.recipeList}>
                {myList && (
                myList.map((recipe) =>(
                    <div className={styles.recipe}>
                        <img src={recipe.image} />
                        <h1>{recipe.name}</h1>
                    </div>
                ))
                )}
            </div>
        </div>
    )
}

export default SetDetail;