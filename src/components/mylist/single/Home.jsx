import React, { useState } from 'react';
import { Routes, Route, Navigate} from 'react-router-dom';
import Add from './Add';
import List from './List';
import './styles.css'
import Input from './Input';
import Button from './AddButton';
import Recipe from './Recipe';

function Home({ user, myList, setMyList }) {

    const [isAdding, setIsAdding] = useState(false);
    const addRecipe  = () => {
        setIsAdding(!isAdding);
    }

    return (
        <div className='single-list-container' >
            <Routes>
                <Route 
                    path='/' 
                    element={
                        <div>
                            <div className='single-recipe-list-header' >
                                <Input user={user} myList={myList} setMyList={setMyList} />
                                <Button addRecipe={addRecipe} />
                                <Add user={user} myList={myList} setMyList={setMyList} isAdding={isAdding} setIsAdding={setIsAdding}/>
                            </div>
                            <List user={user} myList={myList} setMyList={setMyList}/>
                        </div>
                    }
                />
                <Route 
                    path='/recipe' 
                    element={
                        <Recipe user={user} myList={myList} setMyList={setMyList} />
                    } 
                />
            </Routes>
        </div>
    );
}

export default Home;