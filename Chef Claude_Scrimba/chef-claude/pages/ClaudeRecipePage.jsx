import { useLocation, Link } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'

function ClaudeRecipe() {
    const { state } = useLocation()
    const recipe = state?.recipe

    return (
        <section className='recipe-section'>
        <Link to="/">Back to Ingredients</Link>
            {recipe ? 
            <ReactMarkdown>{recipe}</ReactMarkdown> :
            <p>No recipe available. Please go back and generate a recipe.</p>
            }
        </section>
    )
} export default ClaudeRecipe