import React from 'react';
import no_image from '../../../assets/no_image.png'
import { FaLock } from "react-icons/fa";


const Card = ({ myRecipe, deleteRecipe }) => {

    const openRecipe = (event) => {
    }


    return (
    <div className='single-recipe-container' key={myRecipe.id} onClick={openRecipe}>
        {!myRecipe.public && (<FaLock />)}
        <h2>{myRecipe.name}</h2>
        <hr/>
        <div className='label-container' >
        {myRecipe.label.map((l) => (
            <p className='label' key={l.id}>{l.name}</p>
        ))}
        </div>
        <hr/>

        <img height='200px' 
            src={myRecipe.image ? myRecipe.image : no_image} 
            alt={myRecipe.name} />

        <hr/>
        <h3>{myRecipe.time} minute</h3>
        <hr/>
        <p>{myRecipe.description}</p>
        <hr/>
        <div>
            <h3>Ingredients</h3>
            <ul>
            {myRecipe.material.map((m) => (
                <li key={m.id}>{m.name} … {m.quantity}</li>
            ))}
            </ul>
        </div>
        <hr/>
        <div>
            <h3>Process</h3>
            <div>
            {myRecipe.process.map((p) => (
                <p key={p.step}>{p.step}. {p.name}</p>
            ))}
            </div>
        </div>

        <button className="delete-recipe-button" onClick={() => deleteRecipe(myRecipe.id)}>Delete</button>
        <button className="card-button">More info</button>
    </div>
    );
}

export default Card;
