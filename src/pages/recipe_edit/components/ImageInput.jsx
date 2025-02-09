import React, { useState } from 'react';
import styles from './input.module.css'

function ImageInput({formData, setFormData}) {

    const [file, setFile] = useState({
        preview: formData.recipeImage, 
        raw: null, 
    });

    const addImageChange = (event) => {
        setFile({
            preview: URL.createObjectURL(event.target.files[0]), 
            raw: event.target.files[0], 
        });
        setFormData({
            ...formData,
            recipeImage: event.target.files[0], 
        });
    }

    return (
        <div className={styles.imageInputContainer}>
            <p>Image</p>
            <input 
                type='file' 
                className='recipe-image-input' 
                placeholder="Add an image"
                name="recipeImage"
                onChange={addImageChange} 
            />
            <img  width='400px' src={file.preview} alt={file.name}/>
        </div>
    )
}

export default ImageInput;