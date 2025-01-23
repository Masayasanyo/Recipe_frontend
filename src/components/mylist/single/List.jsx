import React, { useState, useEffect } from 'react';
import Card from './Card';
import '../styles.css';


function List ({ user, myList, setMyList }) {

    useEffect(() => {
        const fetchRecipes = async () => {
            let account_id = user.id;
            try {
                // const response = await fetch('https://recipe-backend-1er1.onrender.com/recipe/mylist', {
                const response = await fetch('http://localhost:3001/recipe/mylist', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    }, 
                    body: JSON.stringify({"account_id": account_id}), 
                });
                if (response.ok) {
                    const data = await response.json();
                    console.log(`Success!`);
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
    
    return (
        <div className='single-recipe-list'>
            {myList.length > 0 ? (
            myList.map((myRecipe) => (
            <Card myRecipe={myRecipe} />
            ))
            ) : (
                <p>No Recipe</p>
            )}
        </div>  
    )    
}

export default List;