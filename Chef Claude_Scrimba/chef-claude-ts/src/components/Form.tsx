import { useState } from "react";
import IngredientList from "./IngredientsList";
import { useNavigate } from "react-router-dom";
import { generateRecipe } from "../AI/ai";


export default function Form() {
    const [ingredients, setIngredients] = useState<string[]>([]);
    const navigate = useNavigate();

    function handleSubmit(formData: FormData): void {
        const ingredient = formData.get("ingredient");

        if (typeof ingredient !== "string") {
            return;
        }

        setIngredients((prevIngredients) => [...prevIngredients, ingredient]);
    }

    async function handleGetRecipe(): Promise<void> {
        const recipe = await generateRecipe(ingredients);
        navigate("/recipe", { state: { recipe } });
    }

    return (
        <section className="p-6 mx-auto max-w-xl">
            <form action={handleSubmit} className="flex gap-3">
                <input type="text"
                    name="ingredient"
                    placeholder="Enter an ingredient"
                    className="min-w-0 flex-1 rounded-md border border-gray-300 px-3 py-2"
                    aria-label="Ingredient" />

                <button type="submit"
                    className="rounded-md bg-gray-900 px-4 py-2 text-white"
                >Add Ingredient</button>
            </form>

            {ingredients.length > 0 && (
                <div>
                    <h2>Ingredients List</h2>
                    <IngredientList items={ingredients} />
                </div>
            )}

            {ingredients.length > 3 && (
                <div className="mt-6 flex items-center justify-between gap-4 rounded-lg bg-stone-100 p-4">
                    <div>
                        <h3 className="font-semibold">Ready for a recipe?</h3>
                        <p className="text-sm text-gray-600">
                            Generate a recipe from your list of ingredients.
                        </p>
                    </div>
                    <button
                        type="button"
                        className="shrink-0 rounded-md bg-orange-700 px-4 py-2 text-white"
                        onClick={handleGetRecipe}>
                        Get a Recipe
                    </button>
                </div>
            )}
        </section>)
}