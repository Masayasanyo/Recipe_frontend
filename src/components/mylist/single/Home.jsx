import React, { useState } from 'react';
import Search from './Search';
import Add from './Add';
import List from './List';
import './styles.css'
import Input from './Input';
import Button from './AddButton';

function Home({ user, myList, setMyList }) {

    const [isAdding, setIsAdding] = useState(false);
    const addRecipe  = () => {
        setIsAdding(!isAdding);
    }

    return (
        <div className='single-list-container' >
            <div className='single-recipe-list-header' >
                <Input user={user} myList={myList} setMyList={setMyList} />
                <Button addRecipe={addRecipe} />
                <Add user={user} myList={myList} setMyList={setMyList} isAdding={isAdding} setIsAdding={setIsAdding}/>
            </div>
            <List user={user} myList={myList} setMyList={setMyList}/>
        </div>
    );
}

export default Home;