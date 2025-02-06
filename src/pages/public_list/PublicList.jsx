import React, { useState, useEffect } from 'react';
import Card from '../../components/card/PublicRecipeCard';
import styles from './public_list.module.css';

function PublicList() {

    const [publicList, setPublicList] = useState(['']);

    useEffect(() => {
        const fetchRecipes = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_API_URL}/recipe/public`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    }, 
                    // body: JSON.stringify({"account_id": account_id}), 
                });
                if (response.ok) {
                    const data = await response.json();
                    console.log(`Success!`);
                    console.log(data.recipe);
                    setPublicList(data.recipe);
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
        <div className={styles.publicList}>
            {publicList.length > 0 ? (
            publicList.map((publicRecipe) => (
            <Card publicRecipe={publicRecipe} />
            ))
            ) : (
                <p>No Recipe</p>
            )}
        </div>
    );
}

export default PublicList;