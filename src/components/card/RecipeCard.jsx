import React from 'react';
import no_image from '../../assets/no_image.png'
import { FaLock } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import styles from './card.module.css'

const Card = ({ myRecipe }) => {

    const navigate = useNavigate();

    const openRecipe = () => {
        navigate("/recipe", { state: { myRecipe } });
    };

    return (
        <div className={styles.card} onClick={openRecipe}>
            {!myRecipe.public && (<FaLock />)}
            <h2>{myRecipe.name}</h2>
            <hr/>
            <div className={styles.labelContainer} >
            {myRecipe.label.map((l) => (
                <p className={styles.label} key={l.id}>{l.name}</p>
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
                {myRecipe.ingredient.map((m) => (
                    <li key={m.id}>{m.name} … {m.quantity}</li>
                ))}
                </ul>
            </div>
            <hr/>
            <div>
                <h3>Process</h3>
                <div>
                {myRecipe.process.map((p) => (
                    <p key={p.id}>{p.step}. {p.name}</p>
                ))}
                </div>
            </div>
        </div>
    );
}

export default Card;
