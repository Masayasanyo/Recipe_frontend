import React, { useState } from 'react';


function Search({ user, myList, setMyList }) {

    const [isSearching, setIsSearching] = useState(false);
    const [searchData, setSearchData] = useState({
        recipeName: "", 
        recipeTime: 0, 
        recipeMaterial: [], 
        recipeLabel: [],
    });
    const openSearch  = () => {
        setIsSearching(!isSearching);
    }
    const resetSearch  = (event) => {
        event.preventDefault();
        getAllData();
        setIsSearching(false);
    }
    const getAllData  = async () => {
        // Fetch all data
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
    }

    // Search Label input
    const [searchLabelInput, setSearchLabelInput] = useState([""]);
    const newSearchLabel  = (event) => {
        event.preventDefault();
        setSearchLabelInput([...searchLabelInput, ""]);
        console.log('searchLabelInput:', searchLabelInput);
    }
    const searchLabelChange  = (index, value) => {
        const updatedSearchLabel = [...searchLabelInput];
        updatedSearchLabel[index] = value;
        setSearchLabelInput(updatedSearchLabel);
        setSearchData({
            ...searchData,
            ["recipeLabel"]: updatedSearchLabel, 
        });
    }
    const cancelSearchLabel  = (event, index) => {
        event.preventDefault();
        const updatedSearchLabel = searchLabelInput.filter((_, i) => i !== index);
        setSearchLabelInput(updatedSearchLabel);
        setSearchData({
            ...searchData,
            ["recipeLabel"]: updatedSearchLabel, 
        });
    }

    //Search material input
    const [searchMateriallInput, setSearchMateriallInput] = useState([""]);
    const newSearchMaterial = (event) => {
        event.preventDefault();
        setSearchMateriallInput([...searchMateriallInput, ""]);
        console.log('materiallInput:', searchMateriallInput);
    }
    const searchMaterialChange = (index, value) => {
        const updatedSearchMaterial = [...searchMateriallInput];
        updatedSearchMaterial[index] = value;
        setSearchMateriallInput(updatedSearchMaterial);
        setSearchData({
            ...searchData,
            ["recipeMaterial"]: updatedSearchMaterial, 
        });
    }
    const cancelSearchMaterial = (event, index) => {
        event.preventDefault();
        const updatedSearchMaterial = searchMateriallInput.filter((_, i) => i !== index);
        setSearchMateriallInput(updatedSearchMaterial);
        setSearchData({
            ...searchData,
            ["recipeMaterial"]: updatedSearchMaterial, 
        });
    }

    const searchChange = (event) => {
        let { name, value } = event.target;
        setSearchData({
            ...searchData,
            [name]: value, 
        });
    }


    const searchSubmit  = (event) => {
        event.preventDefault();
        const name = searchData.recipeName;
        const label = searchData.recipeLabel;
        const time = searchData.recipeTime;
        const material = searchData.recipeMaterial;
        let searchedList = myList;
        if (name) {
            searchedList = myList.filter(item => item.name.toLowerCase() === name.toLowerCase());
        };
        // if (label.length > 0) {
        //     const labelIdList = [];
        //     for (var i = 0; i < label.length; i++) {
        //         for (var j = 0; j < searchedList[i].length; i++) {
        //             console.log(searchedList);
        //             searchedList = searchedList.filter(item => item.label.includes(label[i]));
        //         }
        //     }
        // };
        if (time > 0) {
            searchedList = searchedList.filter(item => item.time < time);
        };
        if (material.length > 0) {
            for (var i = 0; i < material.length; i++) {
                const materialCheck = (m) => {
                    let isOk = false;
                    for (var j = 0; j < m.length; j++) {
                        if (Object.values(m[j]).includes(material[i])) {
                            isOk = true;
                        }
                    }
                    return isOk;
                }
                searchedList = searchedList.filter(item => materialCheck(item.material));
            };
        };
        setMyList(searchedList);
        setSearchData({
            recipeName: "", 
            recipeTime: 0, 
            recipeMaterial: [], 
            recipeLabel: [],
        });
        setIsSearching(false);
    }
    


    return (
        <div className='my-list-search' >
            <button className='header-button' onClick={openSearch}>Search</button>
            {isSearching && (
                <form onSubmit={searchSubmit} className='search-recipe-container'>
                    
                    <h3>Recipe Title</h3>
                    <input 
                        className='recipe-name' 
                        placeholder=""
                        type="text"
                        name="recipeName"
                        value={searchData.recipeName}
                        onChange={searchChange}
                    />

                    <h3>Label</h3>
                    <button onClick={newSearchLabel} className='plus-label'>+ Add label</button>
                    {searchLabelInput.map((label, index) => (
                    <div key={index} className='label-input-container'>
                        <input 
                            className='recipe-label' 
                            placeholder="example: lunch,summer,..."
                            type="text"
                            name="recipeLabel"
                            value={label}
                            onChange={(e) => searchLabelChange(index, e.target.value)}
                        />
                        <button onClick={(event) => cancelSearchLabel(event, index)} className='cancel-label'>×</button>
                    </div>
                    ))}

                    <h3>Time (max)</h3>
                    <input 
                        className='recipe-time' 
                        placeholder="Max Min"
                        type="number"
                        name="recipeTime"
                        value={searchData.recipeTime}
                        onChange={searchChange}
                    />

                    <h3>Material</h3>
                    <button onClick={newSearchMaterial} className='plus-material'>+ Add material</button>
                    {searchMateriallInput.map((m, index) => (
                    <div key={index} className='material-input-container'>
                        <input 
                            className='recipe-material-name' 
                            placeholder="name"
                            type="text"
                            name="recipeMaterialName"
                            onChange={(e) => searchMaterialChange(index, e.target.value)}
                        />
                        <button onClick={(event) => cancelSearchMaterial(event, index)} className='cancel-material'>×</button>
                    </div>
                    ))}
                    
                    <div className='button-container'>
                        <button type='submit'>Apply</button>
                        <button onClick={openSearch}>Cancel</button>
                        <button onClick={resetSearch}>Reset</button>    
                    </div>
                    
                </form>
            )}
        </div>
    )
}

export default Search;