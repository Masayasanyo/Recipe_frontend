import React, { useState, useEffect } from 'react';
import Single from './Single';
import Set from './Set';

function MyList({ user }) {
    const [myList, setMyList] = useState({});
    const [newList, setNewList] = useState(myList);

    // Fetch user's recipe list
    useEffect(() => {
        const fetchRecipes = async () => {
            let account_id = user.id;
            try {
                const response = await fetch('https://recipe-backend-1er1.onrender.com/recipe/mylist', {
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
                    setNewList(data.recipe);
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
            {/* <div className='my-list-header'>
                <button onClick={handleSingle}>Single</button>
                <button onClick={handleSet}>Set</button>
            </div> */}
            {singleOrSet ? (
                <Set/>
            ) : (
                <Single user={user} myList={myList} newList={newList} setMyList={setMyList} setNewList={setNewList}/>
            )}
        </div>
    );
}

export default MyList;