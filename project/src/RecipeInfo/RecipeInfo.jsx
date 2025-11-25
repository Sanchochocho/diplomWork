import './RecipeInfo.css';

const RecipeInfo = ({ recipe, onClose }) => {
    return (
        <div className="recipe-info-overlay">
            <div className="recipe-info-card">
                <button className="close-button" onClick={onClose}>x</button>
                <h2 className="recipe-info-title">{recipe.name}</h2>
                <img
                    src={recipe.image_url}
                    alt={recipe.name}
                    className="recipe-info-image"
                />
                <p className="recipe-info-category">Категория: {recipe.categories?.name}</p>
                <p className="recipe-info-description">{recipe.description}</p>
                <h3>Ингредиенты:</h3>
                <ul>
                    {recipe.recipe_ingredients.map((ingredient, index) => (
                        <li key={index}>{ingredient.ingredients.name}</li>
                    ))}
                </ul>
                <h3>Инструкции:</h3>
                <p className="recipe-info-instructions">{recipe.instructions}</p>
            </div>
        </div>
    );
};

export default RecipeInfo;