import React, { use, useState } from 'react';
import Switch from './Switch';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


const Recipe = () => {

    const location = useLocation();
    const { myRecipe } = location.state || {};

    const navigate = useNavigate();

    const backHome = () => {
        navigate("/mylist");
    };

    const deleteRecipe = async (key) => {

        const data = {recipe_id: key};

        try {
            // const response = await fetch('https://recipe-backend-1er1.onrender.com/recipe/single', {
            const response = await fetch('http://localhost:3001/recipe/single', {
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



    var labelsList = [];
    for (var i = 0; i < myRecipe.label.length; i++) {
        labelsList.push(myRecipe.label[i].name);
    }
    
    const [editData, setEditData] = useState({
        recipePublic: myRecipe.public, 
        recipeName: myRecipe.name, 
        recipeImage: myRecipe.image, 
        recipeDescription: myRecipe.description,
        recipeTime: myRecipe.time, 
        recipeMaterial: myRecipe.material, 
        recipeProcess: myRecipe.process, 
        recipeLabel: labelsList,
    });

    const [isChecked, setIsChecked] = useState(myRecipe.public);
    const handleCheckboxChange = (event) => {
        setEditData({
            ...editData,
            ["recipePublic"]: event.target.checked, 
        });
        setIsChecked(event.target.checked);
    };
    
    const [labelInput, setLabelInput] = useState(labelsList);
    const addNewLabel  = (event) => {
        event.preventDefault();
        setLabelInput([...labelInput, ""]);
    }
    const addLabelChange  = (index, value) => {
        const updatedLabel = [...labelInput];
        updatedLabel[index] = value;
        setLabelInput(updatedLabel);
        setEditData({
            ...editData,
            ["recipeLabel"]: updatedLabel, 
        });
    }
    const addCancelLabel  = (event, index) => {
        event.preventDefault();
        const updatedLabel = labelInput.filter((_, i) => i !== index);
        setLabelInput(updatedLabel);
        setEditData({
            ...editData,
            ["recipeLabel"]: updatedLabel, 
        });
    }

    //Add material input
    const [materiallInput, setMaterialInput] = useState(myRecipe.material);
    const addNewMaterial = (event) => {
        event.preventDefault();
        setMaterialInput([...materiallInput, {"name": "", "quantity": ""}]);
    }
    const addMaterialChange = (index, target) => {
        const updatedMaterial = [...materiallInput];
        if (target.name === "recipeMaterialName") {
            updatedMaterial[index]["name"] = target.value;
            setMaterialInput(updatedMaterial);
        }
        else {
            updatedMaterial[index]["quantity"] = target.value;
            setMaterialInput(updatedMaterial);
        }
        setEditData({
            ...editData,
            ["recipeMaterial"]: updatedMaterial, 
        });
    }
    const addCancelMaterial = (event, index) => {
        event.preventDefault();
        const updatedMaterial = materiallInput.filter((_, i) => i !== index);
        setMaterialInput(updatedMaterial);
        setEditData({
            ...editData,
            ["recipeMaterial"]: updatedMaterial, 
        });
    }

    // Add process input
    const [processInput, setProcessInput] = useState(myRecipe.process);
    const addNewProcess  = (event) => {
        event.preventDefault();
        setProcessInput([...processInput, {"step": 0, "name": ""}]);
    }
    const addProcessChange  = (index, value) => {
        const updatedProcess = [...processInput];
        updatedProcess[index]["step"] = index + 1;
        updatedProcess[index]["name"] = value;
        setProcessInput(updatedProcess);
        setEditData({
            ...editData,
            ["recipeProcess"]: updatedProcess, 
        });
    }
    const addCancelProcess  = (event, index) => {
        event.preventDefault();
        const updatedProcess = processInput.filter((_, i) => i !== index);
        setProcessInput(updatedProcess);
        setEditData({
            ...editData,
            ["recipeProcess"]: updatedProcess, 
        });
    }

    // Title, time. description, ..
    const addChange = (event) => {
        let { name, value } = event.target;
        setEditData({
            ...editData,
            [name]: value, 
        });
    }
    const addSubmit  = async (event) => {
        event.preventDefault();
      
        // Add into database
        try {
            const data = {"public_private": editData.recipePublic, "accountId": myRecipe["account_id"], "recipeId":myRecipe["id"], "title": editData.recipeName, "image": editData.recipeImage, "time": editData.recipeTime, "description": editData.recipeDescription, "material": editData.recipeMaterial, "process": editData.recipeProcess, "label": editData.recipeLabel}
            
            // const response = await fetch('https://recipe-backend-1er1.onrender.com/recipe/add', {
            const response = await fetch('http://localhost:3001/recipe/edit', {
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
            // const response = await fetch('https://recipe-backend-1er1.onrender.com/recipe/mylist', {
            const response = await fetch('http://localhost:3001/recipe/mylist', {
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
        setEditData({
            recipePublic: false, 
            recipeName: "",
            recipeImage: "",
            recipeDescription: "",
            recipeTime: 0,
            recipeMaterial: [],
            recipeProcess: [],
            recipeLabel: [],
        });
    }
    


    return (
        <form onSubmit={addSubmit} className='edit-recipe-container' >
{/* 
            <div className='edit-recipe-button-container'> 
                <button type='submit' className="edit-recipe-apply-button">Apply</button>
            </div> */}
            <div className='edit-recipe-form-container' >
                <div className='edit-recipe-first-form'>

                    <div>
                        <p>Make public</p>
                        <Switch isChecked={isChecked} handleCheckboxChange={handleCheckboxChange}/>
                    </div>

                    
                    <div>
                        <p>Title</p>
                        <input 
                            className='recipe-name-input' 
                            placeholder="Add a title"
                            type="text"
                            name="recipeName"
                            value={editData.recipeName}
                            onChange={addChange}
                        />
                    </div>
            
                    <div>
                        <p>Image</p>
                        <input 
                            className='recipe-image-input' 
                            placeholder="Add an image"
                            type="text"
                            name="recipeImage"
                            value={editData.recipeImage}
                            onChange={addChange}
                        />
                    </div>
            
                    <div>
                        <p>Description</p>
                        <textarea 
                            className='recipe-description-input'
                            id='recipe-description-input'
                            placeholder="Add a detailed description"
                            type="text"
                            name="recipeDescription"
                            value={editData.recipeDescription}
                            onChange={addChange}
                        />
                    </div>
            
                    
                    <div>
                        <p>Time</p>
                        <div className='recipe-time-input-container'>
                            <input 
                                className='recipe-time-input' 
                                id='recipe-time-input'
                                placeholder="Add cooking time"
                                type="number"
                                name="recipeTime"
                                value={editData.recipeTime}
                                onChange={addChange}
                            />
                            <p>minute</p>
                        </div>
                    </div>

                </div>

                <div>
                    <p>Label</p>
                    <div className='recipe-label-input-all-container'>
                        {labelInput.map((label, index) => (
                        <div key={index} className='recipe-label-input-container'>
                            <input 
                                className='recipe-label-input' 
                                id='recipe-label-input'
                                placeholder="Add a label"
                                type="text"
                                name="recipeLabel"
                                value={label}
                                onChange={(e) => addLabelChange(index, e.target.value)}
                            />
                            <button onClick={(event) => addCancelLabel(event, index)} className='cancel-new-label'>×</button>
                        </div>
                        ))}
                        <button onClick={addNewLabel} className='new-label'>+</button>
                    </div>
                </div>
        
                <div>
                    <p>Ingredients</p>
                    <div className='recipe-material-input-all-container'>
                        {materiallInput.map((material, index) => (
                        <div key={index} className='recipe-material-input-container'>
                            <input 
                                className='recipe-material-name-input' 
                                id='recipe-material-name-input' 
                                placeholder="Add a material name"
                                type="text"
                                name="recipeMaterialName"
                                value={material.name}
                                onChange={(e) => addMaterialChange(index, e.target)}
                            />
                            <input 
                                className='recipe-material-quantity-input' 
                                id='recipe-material-quantity-input' 
                                placeholder="Quantity"
                                type="text"
                                name="recipeMaterialQuantity"
                                value={material.quantity}
                                onChange={(e) => addMaterialChange(index, e.target)}
                            />
                            <button onClick={(event) => addCancelMaterial(event, index)} className='cancel-new-material'>×</button>
                        </div>
                        ))}
                        <button onClick={addNewMaterial} className='new-material'>+</button>
                    </div>
                </div>
        
                <div>
                    <p>Processes</p>
                    <div className='recipe-process-input-all-container'>
                        {processInput.map((process, index) => (
                        <div key={index} className='recipe-process-input-container'>
                            <textarea 
                                className='recipe-process-input' 
                                id='recipe-process-input' 
                                placeholder="Add a process"
                                type="text"
                                name="recipeProcess"
                                value={process.name}
                                onChange={(e) => addProcessChange(index, e.target.value)}
                            />
                            <button onClick={(event) => addCancelProcess(event, index)} className='cancel-new-process'>×</button>
                        </div>
                        ))}
                        <button onClick={addNewProcess} className='new-process'>+</button>
                    </div>
                </div>
            </div>

            <div className='edit-recipe-button-container'> 
                <button type='submit' className="edit-recipe-apply-button">Apply</button>
                <button id="delete-recipe-button" onClick={deleteRecipe} >Delete</button>
            </div>
        </form>    
    );
}

export default Recipe;
