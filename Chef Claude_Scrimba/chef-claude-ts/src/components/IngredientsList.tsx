

type IngredientsListProps = {
    items: string[];
};

export default function IngredientsList({ items }: IngredientsListProps) {
    return (
        <div>
            <ul className="list-disc pl-5" aria-live="polite">
                {items.map((item) => (
                    <li key={item}>{item}</li>
                ))}
            </ul>
        </div>
    )
}