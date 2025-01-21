import React from 'react';
import styled from 'styled-components';

const Button = ({addRecipe}) => {
  return (
    <StyledWrapper>
      <button className="Btn" onClick={addRecipe}>
        <div className="sign">+</div>
        {/* <div className="text">Add</div> */}
      </button>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .Btn {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    width: 40px;
    height: 40px;
    border: none;
    border-radius: 10px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition-duration: .3s;
    box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.199);
    background-color: #73BBA3;
    margin-left: 20px
  }

  /* plus sign */
  .sign {
    width: 100%;
    font-size: 2em;
    color: white;
    transition-duration: .3s;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  /* text */
  .text {
    position: absolute;
    right: 0%;
    width: 0%;
    opacity: 0;
    color: white;
    font-size: 1.2em;
    font-weight: 500;
    transition-duration: .3s;
    margin-left: 20px
  }
  /* button click effect*/
  .Btn:active {
    transform: translate(2px ,2px);
  }`;

export default Button;
