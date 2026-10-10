import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
    apiKey: import.meta.env.VITE_GEMINI_API_KEY,
});

export async function generateRecipe(ingredients: string[]): Promise<string> {
    const ingredientList = ingredients.join(", ");

    const response = await ai.models.generateContent({
        model: "gemini-3.8-flash",
        contents: `
      You are an assistant that receives a list of ingredients that a user has and suggests a recipe they could make with some or all of those ingredients. You don't need to use every ingredient they mention in your recipe. The recipe can include additional ingredients they didn't mention, but try not to include too many extra ingredients. Format your response in markdown to make it easier to render to a web page.

      Here are the user's ingredients: ${ingredientList}
    `,
    });

    if(response.text === undefined) {
        throw new Error("There was an error generating the recipe. Please try again.");
    }

    return response.text;
}
