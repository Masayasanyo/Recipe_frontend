import React, { useState } from 'react';
import styles from './input.module.css'

function ProcessInput({formData, setFormData, myRecipe}) {

    const [processInput, setProcessInput] = useState(myRecipe.process || [{"step": 0, "name": ""}]);

    const addNewProcess  = (event) => {
        event.preventDefault();
        setProcessInput([...processInput, {"step": 0, "name": ""}]);
    }
    const addProcessChange  = (index, value) => {
        const updatedProcess = [...processInput];
        if (value) {
            updatedProcess[index]["step"] = index + 1;
            updatedProcess[index]["name"] = value;
            setProcessInput(updatedProcess);
            setFormData({
                ...formData,
                recipeProcess: updatedProcess, 
            });
        }
    }
    const addCancelProcess  = (event, index) => {
        event.preventDefault();
        const updatedProcess = processInput.filter((_, i) => i !== index);
        setProcessInput(updatedProcess);
        setFormData({
            ...formData,
            recipeProcess: updatedProcess, 
        });
    }

    return (
        <div>
            <p>Processes</p>
            <div className={styles.container}>
                {processInput.map((process, index) => (
                <div key={index} className={styles.processForm}>
                    <textarea 
                        value={process['name']}
                        placeholder="Add a process"
                        type="text"
                        name="recipeProcess"
                        onChange={(e) => addProcessChange(index, e.target.value)}
                    />
                    <button onClick={(event) => addCancelProcess(event, index)} className={styles.cancel}>×</button>
                </div>
                ))}
                <button onClick={addNewProcess} className={styles.new}>+</button>
            </div>
        </div>
    )
}

export default ProcessInput;