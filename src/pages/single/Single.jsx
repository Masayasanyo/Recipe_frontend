import React, { useEffect, useState, useContext } from 'react';
import Card from '../../components/card/RecipeCard';
import Input from '../../components/search/SearchInput'
import Add from '../../components/add/AddRecipe'
import Button from '../../components/button/PlusButton'
import { AuthContext } from '../../context/AuthContext';
import styles from './single.module.css';


function Single () {

    const { user } = useContext(AuthContext);
    const [myList, setMyList] = useState([]);
    const [isAdding, setIsAdding] = useState(false);
    const addRecipe  = () => {
        setIsAdding(!isAdding);
    }

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
    
    return (
        <div className={styles.single}>
            <div className={styles.header} >
                <Input user={user} myList={myList} setMyList={setMyList} />
                {isAdding && (
                    <Add myList={myList} setMyList={setMyList} setIsAdding={setIsAdding}/>
                )}                
                <Button addRecipe={addRecipe} />
            </div>
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

export default Single;