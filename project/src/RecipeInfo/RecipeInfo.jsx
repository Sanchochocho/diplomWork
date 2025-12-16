import './RecipeInfo.css';
import { useEffect } from "react";

const RecipeInfo = ({ recipe, onClose }) => {

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);


  return (
    <div className="recipe-info-overlay">
      <div className="recipe-info-card">

        <button className="close-button" onClick={onClose}>×</button>

        <h2 className="recipe-info-title">{recipe.title}</h2>

        <img
          src={recipe.image_url}
          alt={recipe.title}
          className="recipe-info-image"
        />

        <div className="recipe-meta">
          <span className="meta-item">Время приготовления {recipe.cooking_time} мин</span>
          <span className="meta-item">Состоит из {recipe.recipe_ingredients?.length || 0} ингредиентов</span>
          <span className="meta-item">{recipe.categories?.name || "Без категории"}</span>
        </div>

        <p className="recipe-info-description">{recipe.description}</p>

        <div className="ingredient-section">
          <h3>Ингредиенты</h3>
          <ul>
            {recipe.recipe_ingredients?.map((item, index) => (
              <li key={index}>
                <span className="ingredient-name">{item.ingredients.name}</span>
                <span className="ingredient-qty">{item.quantity}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="instructions-section">
          <h3>Шаги приготовления</h3>
          <p className="recipe-info-instructions">{recipe.instructions}</p>
        </div>

      </div>
    </div>
  );
};

export default RecipeInfo;
