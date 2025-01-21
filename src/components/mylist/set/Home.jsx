import React from 'react';
import Search from './Search';
import Add from './Add';
import List from './List';

function Home({ user, myList, setMyList }) {

    return (
        <div className='my-list' >
            {/* <div className='my-list-header' >
                <Search user={user} myList={myList} setMyList={setMyList} />
                <Add user={user} myList={myList} setMyList={setMyList} />
            </div> */}
            <List user={user} myList={myList} setMyList={setMyList}/>
        </div>
    );
}

export default Home;

