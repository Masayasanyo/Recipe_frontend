import React, { useState, useEffect } from 'react';
import SingleHome from './single/Home';
import { Routes, Route, Navigate} from 'react-router-dom';
import Recipe from './single/Recipe';
import SetHome from './set/Home';
import "./styles.css"
import Switch from './Switch';

function MyList({ user }) {
    const [myList, setMyList] = useState({});

    // Fetch user's recipe list
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

    // My list header
    const [singleOrSet, setSingleOrSet] = useState(false);
    const handleSingle  = () => {
        setSingleOrSet(false);
    }
    const handleSet  = () => {
        setSingleOrSet(true);
    }

    return (
        <div className='my-list' >
            <Routes>
                <Route 
                    path='/' 
                        element={
                            <SingleHome user={user} myList={myList} setMyList={setMyList} />
                        } 
                />
                <Route 
                    path='/recipe' 
                        element={
                            <Recipe />
                        } 
                />
            </Routes>




            {/* <Switch /> */}
            {/* <div className='my-list-header'>
                <button onClick={handleSingle}>Single</button>
                <button onClick={handleSet}>Set</button>
            </div> */}
            {/* {singleOrSet ? (
                <SetHome user={user} myList={myList} setMyList={setMyList} />
            ) : (
                <SingleHome user={user} myList={myList} setMyList={setMyList} />
            )} */}
        </div>
    );
}

export default MyList;