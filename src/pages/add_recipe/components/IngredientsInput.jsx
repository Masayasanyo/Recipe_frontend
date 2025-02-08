import React, { useState } from 'react';
import styles from './input.module.css'

function IngredientInput({formData, setFormData}) {

    const [ingredientInput, setIngredientInput] = useState([{"name": "", "quantity": ""}]);

    const addIngredientChange = (index, target) => {
        const updatedIngredient = [...ingredientInput];
        if (target.value) {
            if (target.name === "recipeIngredientName") {
                updatedIngredient[index]["name"] = target.value;
                setIngredientInput(updatedIngredient);
                setFormData({
                    ...formData,
                    recipeIngredient: updatedIngredient, 
                });
            }
            else {
                updatedIngredient[index]["quantity"] = target.value;
                setIngredientInput(updatedIngredient);
                setFormData({
                    ...formData,
                    recipeIngredient: updatedIngredient, 
                });
            }
        }
    }

    const addNewIngredient = (event) => {
        event.preventDefault();
        setIngredientInput([...ingredientInput, {"name": "", "quantity": ""}]);
    }
    
    const addCancelIngredient = (event, index) => {
        event.preventDefault();
        const updatedIngredient = ingredientInput.filter((_, i) => i !== index);
        setIngredientInput(updatedIngredient);
    }

    return (
        <div>
            <p>Ingredients</p>
            <div className={styles.container}>
                {ingredientInput.map((ingredient, index) => (
                <div key={index} className={styles.ingredientForm}>
                    <input 
                        placeholder="Add a ingredient name"
                        type="text"
                        name="recipeIngredientName"
                        onChange={(e) => addIngredientChange(index, e.target)}
                    />
                    <input 
                        placeholder="Quantity"
                        type="text"
                        name="recipeIngredientQuantity"
                        onChange={(e) => addIngredientChange(index, e.target)}
                    />
                    <button onClick={(event) => addCancelIngredient(event, index)} className={styles.cancel}>×</button>
                </div>
                ))}
                <button onClick={addNewIngredient} className={styles.new}>+</button>
            </div>
        </div>
    )
}

export default IngredientInput;