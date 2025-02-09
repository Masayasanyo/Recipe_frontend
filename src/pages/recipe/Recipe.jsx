import React from 'react';
import no_image from '../../assets/no_image.png'
import { FaLock } from "react-icons/fa";
import { useLocation, useNavigate } from 'react-router-dom';
import styles from './recipe.module.css'

const Recipe = () => {

    const navigate = useNavigate();
    const location = useLocation();
    const { myRecipe } = location.state || {};

    const openRecipe = () => {
        navigate("/recipe_edit", { state: { myRecipe } });
    };

    console.log(myRecipe);

    return (
        <div className={styles.card}>
            <div className={styles.recipeButtonContainer}>
                <button className={styles.recipeButton} onClick={openRecipe} >Edit</button>
            </div>
            <div className={styles.recipeContainer}>
                <div className={styles.recipeContainerOne} >
                    <div>
                        {!myRecipe.public && (<FaLock />)}
                        <h2>{myRecipe.name}</h2>
                        <hr/>
                        <p>{myRecipe.description}</p>
                        <hr />
                        <h3>{myRecipe.time !== 0 ? myRecipe.time : '_'} minute</h3>
                        <hr/>
                        <div className={styles.labelContainer} >
                            {myRecipe.label.map((l) => (
                                l.name&&
                                <p className={styles.label} key={l.id}>{l.name}</p>
                            ))}
                        </div>
                    </div>             

                    <img width='600px' height='400px'
                        src={myRecipe.image ? myRecipe.image : no_image} 
                        alt={myRecipe.name} 
                    />
                </div>

                <hr />

                <div className={styles.recipeContainerTwo}>
                    <div className={styles.ingredient}>
                        <h3>Ingredients</h3>
                        <ul>
                        {myRecipe.ingredient.map((m) => (
                            m.name &&
                            <li key={m.id}>{m.name} … {m.quantity}</li>
                        ))}
                        </ul>
                    </div>
                    <div className={styles.process}>
                        <h3>Process</h3>
                        <div>
                        {myRecipe.process.map((p) => (
                            p.name &&
                            <p key={p.id}>{p.step}. {p.name}</p>
                        ))}
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default Recipe;
