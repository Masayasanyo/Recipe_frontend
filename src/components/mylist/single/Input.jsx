import React, { useState } from 'react';
import styled from 'styled-components';

const Input = ({ user, setMyList }) => {

  const [searchData, setSearchData] = useState('');

  const searchChange = (event) => {
    let { name, value } = event.target;
    setSearchData(value);
  }

  const handleKeyDown = async (event) => {
    if (event.key === "Enter") {
      try {
        // const response = await fetch('https://recipe-backend-1er1.onrender.com/recipe/mylist/search', {
        const response = await fetch('http://localhost:3001/recipe/mylist/search', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            }, 
            body: JSON.stringify({"account_id": user.id, "keyword": searchData}), 
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
    }
  }

  return (
    <StyledWrapper>
      <div className="group">
        <svg className="icon" aria-hidden="true" viewBox="0 0 24 24"><g><path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z" /></g></svg>
        <input 
          placeholder="Titles, labels, ingredients" 
          type="search" 
          className="input"
          name="recipeName"
          // value={searchData.recipeName}
          onChange={searchChange} 
          onKeyDown={handleKeyDown}
         />
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .group {
   display: flex;
   line-height: 28px;
   align-items: center;
   position: relative;
   max-width: 220px;
  }

  .input {
   width: 100%;
   height: 40px;
   line-height: 28px;
   padding: 0 1rem;
   padding-left: 2.5rem;
   border: 2px solid transparent;
   border-radius: 8px;
   outline: none;
   background-color: #f3f3f4;
   color: #0d0c22;
   transition: .3s ease;
  }

  .input::placeholder {
   color: #9e9ea7;
  }

  .input:focus, input:hover {
   outline: none;
   border-color: #73BBA3;
   background-color: #fff;
   box-shadow: 0 0 0 4px rgb(234 76 137 / 10%);
  }

  .icon {
   position: absolute;
   left: 1rem;
   fill: #9e9ea7;
   width: 1rem;
   height: 1rem;
  }`;

export default Input;
