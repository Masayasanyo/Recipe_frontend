import React, { useState } from 'react';
import Switch from './components/PrivateSwitch';
import { useLocation, useNavigate } from 'react-router-dom';
import TitleInput from './components/TitleInput';
import ImageInput from './components/ImageInput';
import DescriptionInput from './components/DescriptionInput';
import TimeInput from './components/TimeInput';
import LabelInput from './components/LabelInput';
import IngredientInput from './components/IngredientsInput';
import ProcessInput from './components/ProcessInput';
import styles from './recipe_edit.module.css';
import IntoSet from './components/IntoSet';

const RecipeEdit = () => {

    const location = useLocation();
    const { myRecipe } = location.state || {};
    const navigate = useNavigate();
    const backHome = () => {
        navigate("/single");
    };


    // var labelsList = [];
    // for (var i = 0; i < myRecipe.label.length; i++) {
    //     labelsList.push(myRecipe.label[i].name);
    // }

    const [formData, setFormData] = useState({
        recipePublic: myRecipe.public, 
        recipeName: myRecipe.name, 
        recipeImage: myRecipe.image, 
        recipeDescription: myRecipe.description,
        recipeTime: myRecipe.time, 
        recipeIngredient: myRecipe.ingredient, 
        recipeProcess: myRecipe.process, 
        recipeLabel: myRecipe.label
    });

    const [setId, setSetId] = useState("nothing");

    const addChange = (event) => {
        let { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value, 
        });
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
            const data = {"set_id": setId, "public_private": formData.recipePublic, "accountId": myRecipe["account_id"], "recipeId":myRecipe["id"], "title": formData.recipeName, "image": imageUrl, "time": formData.recipeTime, "description": formData.recipeDescription, "ingredient": formData.recipeIngredient, "process": formData.recipeProcess, "label": formData.recipeLabel}
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
            recipePublic: myRecipe.public, 
            recipeName: myRecipe.name, 
            recipeImage: myRecipe.image, 
            recipeDescription: myRecipe.description,
            recipeTime: myRecipe.time, 
            recipeIngredient: myRecipe.ingredient, 
            recipeProcess: myRecipe.process, 
            recipeLabel: myRecipe.label,
        });
    }
    

    return (
        <form onSubmit={addSubmit} className={styles.container} >
            <div className={styles.button}>               
                <button type='submit'>Apply</button>
                <button className={styles.deleteButton} onClick={deleteRecipe} >Delete</button>
            </div>
            <hr />
            <div className={styles.form} >
                <div className={styles.formOne}>
                    <div className={styles.formOneLeft}>
                        <Switch formData={formData} setFormData={setFormData} />
                        <TitleInput formData={formData} addChange={addChange} />
                        <DescriptionInput formData={formData} addChange={addChange} />
                        <TimeInput formData={formData} addChange={addChange} />
                        <IntoSet setSetId={setSetId} />
                    </div>
                    <ImageInput formData={formData} setFormData={setFormData} />
                </div>
                <hr />
                <div className={styles.formTwo}>
                    <LabelInput formData={formData} setFormData={setFormData} myRecipe={myRecipe}/>
                    <IngredientInput formData={formData} setFormData={setFormData} myRecipe={myRecipe}/>
                    <ProcessInput formData={formData} setFormData={setFormData} myRecipe={myRecipe}/>
                </div>
            </div>
        </form>    
    );
}

export default RecipeEdit;