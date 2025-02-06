import React, { useState } from 'react';
import Switch from '../../components/switch/PrivateSwitch';
import { useLocation, useNavigate } from 'react-router-dom';
import TitleInput from './components/TitleInput';
import ImageInput from './components/ImageInput';
import DescriptionInput from './components/DescriptionInput';
import TimeInput from './components/TimeInput';
import LabelInput from './components/LabelInput';
import IngredientInput from './components/IngredientsInput';
import ProcessInput from './components/ProcessInput';
import styles from './recipe.module.css';
import IntoSet from './components/IntoSet';


const Recipe = () => {

    const location = useLocation();
    const { myRecipe } = location.state || {};
    const navigate = useNavigate();
    const backHome = () => {
        navigate("/single");
    };


    var labelsList = [];
    for (var i = 0; i < myRecipe.label.length; i++) {
        labelsList.push(myRecipe.label[i].name);
    }

    const [formData, setFormData] = useState({
        recipeSetId: myRecipe.setId, 
        recipePublic: myRecipe.public, 
        recipeName: myRecipe.name, 
        recipeImage: myRecipe.image, 
        recipeDescription: myRecipe.description,
        recipeTime: myRecipe.time, 
        recipeIngredient: myRecipe.ingredient, 
        recipeProcess: myRecipe.process, 
        recipeLabel: labelsList,
    });

    const addChange = (event) => {
        if (event.target) {
            let { name, value } = event.target;
            setFormData({
                ...formData,
                [name]: value, 
            });
        }
        else {
            setFormData({
                ...formData,
                recipeSetId: event, 
            });
            console.log(event);
        }
    }


    const deleteRecipe = async () => {
        const data = {recipe_id: myRecipe.id};
        console.log(data);

        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/recipe/single`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                }, 
                body: JSON.stringify(data), 
            });
            if (response.ok) {
                const data = await response.json();
                console.log(data.data[0]);
                console.log(`Deleted successfully: ${data.data[0].name}`);
                backHome();
            } else {
                console.log('Failed');
            }
        } catch (error) {
            console.error('Error:', error);
            console.log('Server error');
        }
    }

    const addSubmit  = async (event) => {
        event.preventDefault();
      
        // Add into database
        try {
            const data = {"set_id": formData.recipeSetId, "public_private": formData.recipePublic, "accountId": myRecipe["account_id"], "recipeId":myRecipe["id"], "title": formData.recipeName, "image": formData.recipeImage, "time": formData.recipeTime, "description": formData.recipeDescription, "ingredient": formData.recipeIngredient, "process": formData.recipeProcess, "label": formData.recipeLabel}
            const response = await fetch(`${process.env.REACT_APP_API_URL}/recipe/edit`, {
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

        // Fetch new data
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/recipe/mylist`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                }, 
                body: JSON.stringify({"account_id": myRecipe.account_id}), 
            });
            if (response.ok) {
                const data = await response.json();
                console.log(`Success!`);
                console.log(data.recipe);
                backHome();
            } else {
                console.log('Failed');
            }
        } catch (error) {
            console.error('Error:', error);
            console.log('Server error');
        }

        // Reset the form data
        setFormData({
            recipeSetId: myRecipe.setId, 
            recipePublic: myRecipe.public, 
            recipeName: myRecipe.name, 
            recipeImage: myRecipe.image, 
            recipeDescription: myRecipe.description,
            recipeTime: myRecipe.time, 
            recipeIngredient: myRecipe.ingredient, 
            recipeProcess: myRecipe.process, 
            recipeLabel: labelsList,
        });
    }
    

    return (
        <form onSubmit={addSubmit} className={styles.editRecipeContainer} >
            <div className={styles.editRecipeFormContainer} >
                <div>
                    <Switch formData={formData} setFormData={setFormData} />
                    <TitleInput formData={formData} addChange={addChange} />
                    <ImageInput formData={formData} setFormData={setFormData} />
                    <DescriptionInput formData={formData} addChange={addChange} />
                    <TimeInput formData={formData} addChange={addChange} />
                    <IntoSet formData={formData} addChange={addChange} />
                </div>
                <LabelInput formData={formData} setFormData={setFormData} myRecipe={myRecipe}/>
                <IngredientInput formData={formData} setFormData={setFormData} myRecipe={myRecipe}/>
                <ProcessInput formData={formData} setFormData={setFormData} myRecipe={myRecipe}/>
            </div>
            <div className={styles.editRecipeButtonContainer}>               
                <button type='submit' className="edit-recipe-apply-button">Apply</button>
                <button id={styles.deleteRecipeButton} onClick={deleteRecipe} >Delete</button>
            </div>
        </form>    
    );
}

export default Recipe;