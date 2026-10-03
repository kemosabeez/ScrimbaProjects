import { useState } from 'react'
import IngredientsList from './IngredientsList'
import { generateRecipe } from '../AI/ai.js'
import Header from './Header.jsx'
import { useNavigate } from 'react-router-dom'

function Form() {
    const navigate = useNavigate()
    const [ingredients, setIngredients] = useState([])
    const ingredientList = ingredients.map(function (item) {
        return (
            <li key={item}>{item}</li>
        )
    })
    function handleSubmit(formData) {

        const updatedIngredientList = formData.get("ingredients")
        setIngredients(prev => [...prev, updatedIngredientList])
    }

    async function handleGetRecipe() {
        const recipe = await generateRecipe(ingredients)
        navigate("/recipe", { state: { recipe } })
    }

    return (
        <>
        <Header />
        <section className='form-section'>

            <form className="add-ingredient-form"
                action={handleSubmit} >

                <input
                    type="text"
                    placeholder="eg. Oregano"
                    aria-label="ingredient"
                    name="ingredients" />
                <button>Add Ingredient</button>
            </form>
            {ingredientList.length !== 0 &&
                <div className='ingredients-list-container'>
                    <h2>Ingredients on hand: </h2>
                    <IngredientsList Items={ingredientList} />
                </div>
            }

            {ingredients.length > 3 &&
                <div className='get-recipe-container'>
                    <h3>Ready for a recipe?</h3>
                    <p>Generate a recipe from your list of ingredients.</p>
                    <button onClick={handleGetRecipe}>Get a recipe</button>
                </div>
            }
        
        </section>
        </>
        

    )
} export default Form