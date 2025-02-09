import React, { useState } from 'react';
import styles from './input.module.css'

function ImageInput({formData, setFormData}) {

    const [file, setFile] = useState({
        preview: '', 
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
        <div>
            <p>Image</p>
            <div className={styles.imageInputContainer} >
                <input 
                    type='file' 
                    className='recipe-image-input' 
                    placeholder="Add an image"
                    name="recipeImage"
                    onChange={addImageChange} 
                />
                <img width='400px' src={file.preview} />
            </div>
        </div>
    )
}

export default ImageInput;