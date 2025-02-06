import React from 'react';
import no_image from '../../assets/no_image.png'
import { useNavigate } from 'react-router-dom';
import styles from './card.module.css'

const Card = ({ publicRecipe }) => {

    const navigate = useNavigate();

    const openRecipe = () => {
        // navigate("/mylist/recipe", { state: { publicRecipe } });
    };

    console.log(publicRecipe);


    return (
        <div className={styles.card} key={publicRecipe.id} onClick={openRecipe}>
            <h2>{publicRecipe.name}</h2>
            <hr/>
            <div className={styles.labelContainer} >
            {publicRecipe.label && publicRecipe.label.length > 0 && (
                publicRecipe.label.map((l) => (
                    <p className={styles.label} key={l.id}>{l.name}</p>
                )))
            }
            </div>
            <hr/>

            <img height='200px' 
                src={publicRecipe.image ? publicRecipe.image : no_image} 
                alt={publicRecipe.name} />

            <hr/>
            <h3>{publicRecipe.time} minute</h3>
            <hr/>
            <p>{publicRecipe.description}</p>

            <hr/>

            <div>
                <h3>Ingredients</h3>
                <ul>
                {publicRecipe.material && publicRecipe.material.length > 0 && (
                    publicRecipe.material.map((m) => (
                        <li key={m.id}>{m.name} … {m.quantity}</li>
                    )))
                }
                </ul>
            </div>

            <hr/>

            <div>
                <h3>Process</h3>
                <div>
                {publicRecipe.process && publicRecipe.process.length > 0 && (
                    (publicRecipe.process.map((p) => (
                        <p key={p.step}>{p.step}. {p.name}</p>
                    ))))
                }
                </div>
            </div>
        </div>
    );
}

export default Card;
