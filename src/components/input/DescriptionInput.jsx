import styles from './input.module.css'

function DescriptionInput({formData, addChange}) {
    return (
        <div>
            <p>Description</p>
            <textarea 
                className={styles.description}
                id='recipe-description-input'
                placeholder="Add a detailed description"
                type="text"
                name="recipeDescription"
                value={formData.recipeDescription}
                onChange={addChange}
            />
        </div>
    )
}

export default DescriptionInput;