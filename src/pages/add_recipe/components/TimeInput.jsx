import styles from './input.module.css'

function TimeInput({formData, addChange}) {
    return (
        <div>
            <div className={styles.time}>
                <input 
                    className={styles.addFormInput}
                    placeholder="Add cooking time"
                    type="number"
                    name="recipeTime"
                    value={formData.recipeTime}
                    onChange={addChange}
                />
                <p>minute</p>
            </div>
        </div>
    )
}

export default TimeInput;