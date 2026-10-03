

function IngredientsList({ Items }) {
    return (
        <div>
            <ul className="ingredients-list" aria-live="polite">
                {Items}
            </ul>
            
        </div>)
} export default IngredientsList