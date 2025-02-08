import React, { useState, useContext } from 'react';
import Switch from '../../components/switch/PrivateSwitch';
import styles from './add_recipe.module.css';
import TitleInput from './components/TitleInput';
import ImageInput from './components/ImageInput';
import DescriptionInput from './components/DescriptionInput';
import TimeInput from './components/TimeInput';
import LabelInput from './components/LabelInput';
import IngredientInput from './components/IngredientsInput';
import ProcessInput from './components/ProcessInput';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';


function AddRecipe () {

    const navigate = useNavigate();

    const { user } = useContext(AuthContext);

    const [formData, setFormData] = useState({
        recipePublic: false, 
        recipeName: "", 
        recipeImage: "", 
        recipeDescription: "",
        recipeTime: 0, 
        recipeLabel: [{"name": ""}], 
        recipeIngredient: [{"name": "", "quantity": ""}], 
        recipeProcess: [{"step": 0, "name": ""}], 
    });

    const addChange = (event) => {
        let { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value, 
        });
    }

    const addCancelRecipe  = () => {
        navigate('/single');
    }

    const addSubmit  = async (event) => {
        event.preventDefault();

        var imageUrl = '';

        if (formData.recipeImage) {
            try {
                const uploadData = new FormData();
                uploadData.append('image', formData.recipeImage);
                const response = await fetch(`${process.env.REACT_APP_API_URL}/recipe/add/image`, {
                    method: 'POST', 
                    body: uploadData, 
                });
                if (response.ok) {
                    const data = await response.json();
                    imageUrl = data.url;
                    console.log(imageUrl);
                } else {
                    console.log('Failed');
                }
            } catch (error) {
                console.error('Error:', error);
                console.log('Server error');
            }
        }

        // Add into database
        try {
            const data = {"public_private": formData.recipePublic, "accountId": user.id, "title": formData.recipeName, "image": imageUrl, "time": formData.recipeTime, "description": formData.recipeDescription, "ingredient": formData.recipeIngredient, "process": formData.recipeProcess, "label": formData.recipeLabel}
            console.log(data);
            const response = await fetch(`${process.env.REACT_APP_API_URL}/recipe/add`, {
                method: 'POST', 
                headers: {
                    'Content-Type': 'application/json',
                }, 
                body: JSON.stringify(data), 
            });
            if (response.ok) {
                const data = await response.json();
                console.log(`Success!: ${data.name}`);
            } else {
                console.log('Failed');
            }
        } catch (error) {
            console.error('Error:', error);
            console.log('Server error');
        }

        // Reset the form data
        setFormData({
            recipePublic: false, 
            recipeName: "", 
            recipeImage: "", 
            recipeDescription: "",
            recipeTime: 0, 
            recipeLabel: [{"name": ""}], 
            recipeIngredient: [{"name": "", "quantity": ""}], 
            recipeProcess: [{"step": 0, "name": ""}], 
        });

        navigate('/single');
    }
    
    return (
        <form onSubmit={addSubmit} className={styles.container} >
            <div className={styles.button}> 
                <button type='submit' className="add-recipe-apply-button">Apply</button>
                <button onClick={addCancelRecipe} className="add-recipe-cancel-button">Cancel</button>    
            </div>
            <div className={styles.form} >
                <div className={styles.formOne}>
                    <Switch formData={formData} setFormData={setFormData} />
                    <ImageInput formData={formData} setFormData={setFormData} />
                    <TitleInput formData={formData} addChange={addChange} />
                    <DescriptionInput formData={formData} addChange={addChange} />
                    <TimeInput formData={formData} addChange={addChange} />
                </div>
                <div className={styles.formTwo}>
                    <LabelInput formData={formData} setFormData={setFormData} />
                    <IngredientInput formData={formData} setFormData={setFormData} />
                    <ProcessInput formData={formData} setFormData={setFormData}/>
                </div>
            </div>
        </form>
    )
}

export default AddRecipe;