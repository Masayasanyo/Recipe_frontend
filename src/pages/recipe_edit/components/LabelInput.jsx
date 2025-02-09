import React, { useState } from 'react';
import styles from './input.module.css'

function LabelInput({formData, setFormData, myRecipe}) {

    const [labelInput, setLabelInput] = useState(myRecipe.label || [{"name": ""}]);

    const addLabelChange  = (index, value) => {
        const updatedLabel = [...labelInput];
        updatedLabel[index]["name"] = value;
        setFormData({
            ...formData,
            recipeLabel: updatedLabel, 
        });
    }

    const addNewLabel  = (event) => {
        event.preventDefault();
        setLabelInput([...labelInput, {"name": ""}]);
    }

    const addCancelLabel  = (event, index) => {
        event.preventDefault();
        const updatedLabel = labelInput.filter((_, i) => i !== index);
        setLabelInput(updatedLabel);
        setFormData({
            ...formData,
            recipeLabel: updatedLabel, 
        });
    }

    return (
        <div>
            <div className={styles.nameAndPlus}>
                <p>Label</p>
                <button onClick={addNewLabel} className={styles.new}>+</button>
            </div>
            <div className={styles.container}>
                {labelInput.map((label, index) => (
                <div key={index} className={styles.labelForm}>
                    <input 
                        value={label["name"]}
                        placeholder="Add a label"
                        type="text"
                        name="recipeLabel"
                        onChange={(e) => addLabelChange(index, e.target.value)}
                    />
                    <button onClick={(event) => addCancelLabel(event, index)} className={styles.cancel}>×</button>
                </div>
                ))}
            </div>
        </div>
    )
}

export default LabelInput;