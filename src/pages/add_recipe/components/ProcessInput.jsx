import React, { useState } from 'react';
import styles from './input.module.css'

function ProcessInput({formData, setFormData, }) {

    const [processInput, setProcessInput] = useState([{"step": 0, "name": ""}]);

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
    }

    return (
        <div>
            <div className={styles.nameAndPlus}>
                <p>Processes</p>
                <button onClick={addNewProcess} className={styles.new}>+</button>
            </div>
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
            </div>
        </div>
    )
}

export default ProcessInput;