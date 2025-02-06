import React, { useState } from 'react';
import styles from './input.module.css'

function LabelInput({formData, setFormData}) {

    const [labelInput, setLabelInput] = useState([{"name": ""}]);

    const addLabelChange  = (index, value) => {
        const updatedLabel = [...labelInput];
        if (value) {
            updatedLabel[index]["name"] = value;
        }        
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
        setFormData({
            ...formData,
            recipeLabel: updatedLabel, 
        });
    }

    return (
        <div>
            <p>Label</p>
            <div className={styles.container}>
                {labelInput.map((label, index) => (
                <div key={index} className={styles.labelForm}>
                    <input 
                        placeholder="Add a label"
                        type="text"
                        name="recipeLabel"
                        onChange={(e) => addLabelChange(index, e.target.value)}
                    />
                    <button onClick={(event) => addCancelLabel(event, index)} className={styles.cancel}>×</button>
                </div>
                ))}
                <button onClick={addNewLabel} className={styles.new}>+</button>
            </div>
        </div>
    )
}

export default LabelInput;