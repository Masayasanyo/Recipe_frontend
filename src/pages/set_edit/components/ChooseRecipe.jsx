import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../../../context/AuthContext';
import styles from '../set_edit.module.css';
import Card from './RecipeCard';


function ChooseRecipe ({setIsAddingRecipe}) {

    const { user } = useContext(AuthContext);
    const [myList, setMyList] = useState([]);

    useEffect(() => {
        const fetchRecipes = async () => {
            let account_id = user.id;
            try {
                const response = await fetch(`${process.env.REACT_APP_API_URL}/recipe/mylist`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    }, 
                    body: JSON.stringify({"account_id": account_id}), 
                });
                if (response.ok) {
                    const data = await response.json();
                    console.log(data.recipe);
                    setMyList(data.recipe);
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

    const selectRecipe = (id) => {
        setIsAddingRecipe(false);
    };
    
    return (
        <div>
            <div className={styles.list} >
                {myList.length > 0 ? (
                myList.map((myRecipe) => (
                <Card myRecipe={myRecipe} key={myRecipe.id} selectRecipe={selectRecipe}/>
                ))
                ) : (
                    <p>No Recipe</p>
                )}
            </div> 
        </div>
    )    
}

export default ChooseRecipe;