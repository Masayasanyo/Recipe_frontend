import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../../../context/AuthContext';
import styles from '../set_edit.module.css';
import Card from './RecipeCard';


function RecipeList ({setId}) {

    const { user } = useContext(AuthContext);
    const [myList, setMyList] = useState([]);

    useEffect(() => {
        const fetchRecipes = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_API_URL}/set/recipe_list`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    }, 
                    body: JSON.stringify({"set_id": setId}), 
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
    
    return (
        <div>
            <div className={styles.list} >
                {myList.length > 0 ? (
                myList.map((myRecipe) => (
                <Card myRecipe={myRecipe} key={myRecipe.id} />
                ))
                ) : (
                    <p>No Recipe</p>
                )}
            </div> 
        </div>
    )    
}

export default RecipeList;