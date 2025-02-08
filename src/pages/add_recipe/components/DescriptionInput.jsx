import styles from './input.module.css'

function DescriptionInput({formData, addChange}) {
    return (
        <div>
            <textarea 
                className={styles.description}
                id='recipe-description-input'
                placeholder="Description"
                type="text"
                name="recipeDescription"
                value={formData.recipeDescription}
                onChange={addChange}
            />
        </div>
    )
}

export default DescriptionInput;