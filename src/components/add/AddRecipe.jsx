import React, { useState, useContext } from 'react';
import Switch from '../switch/PrivateSwitch';
import styles from './add_recipe.module.css';
import TitleInput from '../input/TitleInput';
import ImageInput from '../input/ImageInput';
import DescriptionInput from '../input/DescriptionInput';
import TimeInput from '../input/TimeInput';
import LabelInput from '../input/LabelInput';
import IngredientInput from '../input/IngredientsInput';
import ProcessInput from '../input/ProcessInput';
import { AuthContext } from '../../context/AuthContext';

function SingleAdd ({ myList, setMyList, setIsAdding }) {

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
        setIsAdding(false);
    }


    const addSubmit  = async (event) => {
        event.preventDefault();

        // Add into database
        try {
            const data = {"public_private": formData.recipePublic, "accountId": user.id, "title": formData.recipeName, "image": formData.recipeImage, "time": formData.recipeTime, "description": formData.recipeDescription, "ingredient": formData.recipeIngredient, "process": formData.recipeProcess, "label": formData.recipeLabel}
            const updatedList = [...myList, data];
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
                setMyList(updatedList);
            } else {
                console.log('Failed');
            }
        } catch (error) {
            console.error('Error:', error);
            console.log('Server error');
        }

        // Fetch new data
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/recipe/mylist`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                }, 
                body: JSON.stringify({"account_id": user.id}), 
            });
            if (response.ok) {
                const data = await response.json();
                console.log(data.recipe);
                setMyList(data.recipe);
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
        setIsAdding(false);
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
                    <TitleInput formData={formData} addChange={addChange} />
                    <ImageInput formData={formData} setFormData={setFormData} />
                    <DescriptionInput formData={formData} addChange={addChange} />
                    <TimeInput formData={formData} addChange={addChange} />
                </div>
                <LabelInput formData={formData} setFormData={setFormData} />
                <IngredientInput formData={formData} setFormData={setFormData} />
                <ProcessInput formData={formData} setFormData={setFormData}/>
            </div>
        </form>
    )
}

export default SingleAdd;