import React, { useState } from 'react';
import styles from './input.module.css'
import { storage } from '../../config/firebase_config';

function ImageInput({formData, setFormData}) {

    const [file, setFile] = useState({
        preview: '', 
        raw: '', 
    });

    const addImageChange = (event) => {
        console.log(event.target.files);
        console.log(URL.createObjectURL(event.target.files[0]));
        setFile({
            preview: URL.createObjectURL(event.target.files[0]), 
            raw: event.target.files[0], 
        });
        setFormData({
            ...formData,
            recipeImage: file.raw, 
        });
    }

    return (
        <div>
            <p>Image</p>
            <input 
                type='file' 
                className='recipe-image-input' 
                placeholder="Add an image"
                name="recipeImage"
                onChange={addImageChange} 
            />
            <img src={file} />
        </div>
    )
}

export default ImageInput;