// import React, { useState } from "react";

// const PopUp = ({}) => {

//   return (
//     <div className='add-recipe-form-container'>
//       <form onSubmit={handleSubmit} className='add-recipe-form'>
        
//         <h3>Title</h3>
//         <input 
//             className='recipe-name-input' 
//             placeholder=""
//             type="text"
//             name="recipeName"
//             value={formData.recipeName}
//             onChange={handleChange}
//         />

//         <h3>Image</h3>
//         <input 
//             className='recipe-image-input' 
//             placeholder="Image URL"
//             type="text"
//             name="recipeImage"
//             value={formData.recipeImage}
//             onChange={handleChange}
//         />

//         <h3>Label</h3>
//         <button onClick={handleNewLabel} className='new-label'>+ Add a label</button>
//         {labelInput.map((label, index) => (
//         <div key={index} className='recipe-label-input-container'>
//             <input 
//                 className='recipe-label-input' 
//                 placeholder="lunch,summer,..."
//                 type="text"
//                 name="recipeLabel"
//                 value={label}
//                 onChange={(e) => handleLabelChange(index, e.target.value)}
//             />
//             <button onClick={(event) => handleCancelLabel(event, index)} className='cancel-new-label'>×</button>
//         </div>
//         ))}

//         <h3>Description</h3>
//         <input 
//             className='recipe-description-input' 
//             placeholder=""
//             type="text"
//             name="recipeDescription"
//             value={formData.recipeDescription}
//             onChange={handleChange}
//         />

//         <h3>Time</h3>
//         <input 
//             className='recipe-time-input' 
//             placeholder=""
//             type="number"
//             name="recipeTime"
//             value={formData.recipeTime}
//             onChange={handleChange}
//         />

//         <h3>Material</h3>
//         <button onClick={handleNewMaterial} className='new-material'>+ Add a material</button>
//         {materiallInput.map((material, index) => (
//         <div key={index} className='recipe-material-input-container'>
//             <input 
//                 className='recipe-material-name-input' 
//                 placeholder="name"
//                 type="text"
//                 name="recipeMaterialName"
//                 onChange={(e) => handleMaterialChange(index, e.target)}
//             />
//             <input 
//                 className='recipe-material-quantity-input' 
//                 placeholder="quantity"
//                 type="text"
//                 name="recipeMaterialQuantity"
//                 onChange={(e) => handleMaterialChange(index, e.target)}
//             />
//             <button onClick={(event) => handleCancelMaterial(event, index)} className='cancel-new-material'>×</button>
//         </div>
//         ))}

//         <h3>Process</h3>
//         <button onClick={handleNewProcess} className='new-process'>+ Add a process</button>
//         {processInput.map((process, index) => (
//         <div key={index} className='recipe-process-input-container'>
//             <input 
//                 className='recipe-process-input' 
//                 placeholder="Process"
//                 type="text"
//                 name="recipeProcess"
//                 onChange={(e) => handleProcessChange(index, e.target.value)}
//             />
//             <button onClick={(event) => handleCancelProcess(event, index)} className='cancel-new-process'>×</button>
//         </div>
//         ))}
//         <div className='add-recipe-button-container'> 
//             <button type='submit' className="add-recipe-apply-button">Apply</button>
//             <button onClick={handleCancelRecipe} className="add-recipe-cancel-button">Cancel</button>    
//         </div>
//       </form>
//     </div>
//   );
// };

// export default PopUp;
