import styles from './input.module.css'

function TitleInput({formData, addChange}) {
    return (
        <div>
            <input 
                className={styles.addFormInput}
                placeholder="Title"
                type="text"
                name="recipeName"
                value={formData.recipeName}
                onChange={addChange}
            />
        </div>
    )
}

export default TitleInput;