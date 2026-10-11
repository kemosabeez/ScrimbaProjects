import { Link, useLocation } from "react-router-dom";
import ReactMarkdown from "react-markdown";

export default function ClaudeRecipePage() {
    const location = useLocation();
    const state: unknown = location.state;
    const recipe =
        typeof state === "object" &&
            state !== null && "recipe" in state
            && typeof state.recipe === "string"
            ? state.recipe :
            undefined;


    return (
        <section className="mx-auto max-w-2xl p-6">
            <Link className="text-blue-700 underline" to="/">
                Back to Ingredients
            </Link>

            {recipe ? (
                <div className="mt-4">
                    <ReactMarkdown>{recipe}</ReactMarkdown>
                </div>
            ) : (
                <p className="mt-4">
                    No recipe available. Please go back and generate a recipe.
                </p>
            )}

        </section>
    )
}