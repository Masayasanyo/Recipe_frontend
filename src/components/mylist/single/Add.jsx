import React, { useState, useEffect } from 'react';
import Switch from './Switch';

function SingleAdd ({ user, myList, setMyList, isAdding, setIsAdding }) {

    const [formData, setFormData] = useState({
        recipePublic: false, 
        recipeName: "", 
        recipeImage: "", 
        recipeDescription: "",
        recipeTime: 0, 
        recipeMaterial: [], 
        recipeProcess: [], 
        recipeLabel: [],
    });

    const addCancelRecipe  = () => {
        setIsAdding(false);
    }

    const [isChecked, setIsChecked] = useState(false);
    const handleCheckboxChange = (event) => {
        setFormData({
            ...formData,
            ["recipePublic"]: event.target.checked, 
        });
        setIsChecked(event.target.checked);
    };
    
    // Add label input
    const [labelInput, setLabelInput] = useState([""]);
    const addNewLabel  = (event) => {
        event.preventDefault();
        setLabelInput([...labelInput, ""]);
    }
    const addLabelChange  = (index, value) => {
        const updatedLabel = [...labelInput];
        if (value) {
            updatedLabel[index] = value;
        }        
        setLabelInput(updatedLabel);
        setFormData({
            ...formData,
            ["recipeLabel"]: updatedLabel, 
        });
    }
    const addCancelLabel  = (event, index) => {
        event.preventDefault();
        const updatedLabel = labelInput.filter((_, i) => i !== index);
        setLabelInput(updatedLabel);
        setFormData({
            ...formData,
            ["recipeLabel"]: updatedLabel, 
        });
    }

    //Add material input
    const [materiallInput, setMaterialInput] = useState([{"name": "", "quantity": ""}]);
    const addNewMaterial = (event) => {
        event.preventDefault();
        setMaterialInput([...materiallInput, {"name": "", "quantity": ""}]);
    }
    const addMaterialChange = (index, target) => {
        const updatedMaterial = [...materiallInput];
        if (target.value) {
            if (target.name === "recipeMaterialName") {
                updatedMaterial[index]["name"] = target.value;
                setMaterialInput(updatedMaterial);
            }
            else {
                updatedMaterial[index]["quantity"] = target.value;
                setMaterialInput(updatedMaterial);
            }
        }
        setFormData({
            ...formData,
            ["recipeMaterial"]: updatedMaterial, 
        });
    }
    const addCancelMaterial = (event, index) => {
        event.preventDefault();
        const updatedMaterial = materiallInput.filter((_, i) => i !== index);
        setMaterialInput(updatedMaterial);
        setFormData({
            ...formData,
            ["recipeMaterial"]: updatedMaterial, 
        });
    }

    // Add process input
    const [processInput, setProcessInput] = useState([{"step": 0, "name": ""}]);
    const addNewProcess  = (event) => {
        event.preventDefault();
        setProcessInput([...processInput, {"step": 0, "name": ""}]);
    }
    const addProcessChange  = (index, value) => {
        const updatedProcess = [...processInput];
        if (value) {
            updatedProcess[index]["step"] = index + 1;
            updatedProcess[index]["name"] = value;
        }
        setProcessInput(updatedProcess);
        setFormData({
            ...formData,
            ["recipeProcess"]: updatedProcess, 
        });
    }
    const addCancelProcess  = (event, index) => {
        event.preventDefault();
        const updatedProcess = processInput.filter((_, i) => i !== index);
        setProcessInput(updatedProcess);
        setFormData({
            ...formData,
            ["recipeProcess"]: updatedProcess, 
        });
    }

    // Title, time. description, ..
    const addChange = (event) => {
        let { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value, 
        });
    }
    const addSubmit  = async (event) => {
        event.preventDefault();

        // Add into database
        try {
            const data = {"public_private": formData.recipePublic, "accountId": user.id, "title": formData.recipeName, "image": formData.recipeImage, "time": formData.recipeTime, "description": formData.recipeDescription, "material": formData.recipeMaterial, "process": formData.recipeProcess, "label": formData.recipeLabel}
            const updatedList = [...myList, data];

            // const response = await fetch('https://recipe-backend-1er1.onrender.com/recipe/add', {
            const response = await fetch('http://localhost:3001/recipe/add', {
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
            // const response = await fetch('https://recipe-backend-1er1.onrender.com/recipe/mylist', {
            const response = await fetch('http://localhost:3001/recipe/mylist', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                }, 
                body: JSON.stringify({"account_id": user.id}), 
            });
            if (response.ok) {
                const data = await response.json();
                console.log(`Success!`);
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
            recipeMaterial: [],
            recipeProcess: [],
            recipeLabel: [],
        });
        setIsAdding(false);
    }
    
    return (
        <div className='' >
            {isAdding && (
                <form onSubmit={addSubmit} className='add-recipe-container' >

                    <div className='add-recipe-button-container'> 
                        <button type='submit' className="add-recipe-apply-button">Apply</button>
                        <button onClick={addCancelRecipe} className="add-recipe-cancel-button">Cancel</button>    
                    </div>
                    <div className='add-recipe-form-container' >
                        <div className='add-recipe-first-form'>

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
                                    value={formData.recipeName}
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
                                    value={formData.recipeImage}
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
                                    value={formData.recipeDescription}
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
                                        value={formData.recipeTime}
                                        onChange={addChange}
                                    />
                                    <p>minute</p>
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
                                            // value={label}
                                            onChange={(e) => addLabelChange(index, e.target.value)}
                                        />
                                        <button onClick={(event) => addCancelLabel(event, index)} className='cancel-new-label'>×</button>
                                    </div>
                                    ))}
                                    <button onClick={addNewLabel} className='new-label'>+</button>
                                </div>
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
                                        onChange={(e) => addMaterialChange(index, e.target)}
                                    />
                                    <input 
                                        className='recipe-material-quantity-input' 
                                        id='recipe-material-quantity-input' 
                                        placeholder="Quantity"
                                        type="text"
                                        name="recipeMaterialQuantity"
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
                                        onChange={(e) => addProcessChange(index, e.target.value)}
                                    />
                                    <button onClick={(event) => addCancelProcess(event, index)} className='cancel-new-process'>×</button>
                                </div>
                                ))}
                                <button onClick={addNewProcess} className='new-process'>+</button>
                            </div>
                        </div>
                    </div>
                </form>
            )}
        </div> 
    )
}

export default SingleAdd;