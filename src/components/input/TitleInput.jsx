import styles from './input.module.css'

function TitleInput({formData, addChange}) {
    return (
        <div>
            <p>Title</p>
            <input 
                className={styles.addFormInput}
                placeholder="Add a title"
                type="text"
                name="recipeName"
                value={formData.recipeName}
                onChange={addChange}
            />
        </div>
    )
}

export default TitleInput;