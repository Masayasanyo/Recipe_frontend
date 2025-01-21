import no_image from '../../../assets/no_image.png'
import Card from './Card';
import '../styles.css';


function List ({ user, myList, setMyList }) {

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
            } else {
                console.log('Failed');
            }
        } catch (error) {
            console.error('Error:', error);
            console.log('Server error');
        }
        
        let account_id = user.id;
        try {
            // const response = await fetch('https://recipe-backend-1er1.onrender.com/recipe/mylist', {
            const response = await fetch('http://localhost:3001/recipe/mylist', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                }, 
                body: JSON.stringify({"account_id": account_id}), 
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

    return (
        <div className='single-recipe-list'>
            {myList.length > 0 ? (
            myList.map((myRecipe) => (
            <Card myRecipe={myRecipe} deleteRecipe={deleteRecipe} />
            ))
            ) : (
                <p>No Recipe</p>
            )}
        </div>  
    )    
}

export default List;