import { useEffect, useState } from "react";
import RecipeInfo from "../RecipeInfo/RecipeInfo";
import "../Recipe/Recipe.css";
import { supabase } from "../supabaseClient";

const Favorites = ({ recipes, currentUser }) => {
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  useEffect(() => {
    if (!currentUser) return;

    const loadFavorites = async () => {
      const { data, error } = await supabase
        .from("favorites")
        .select("recipe_id")
        .eq("user_id", currentUser.id);

      if (error) {
        console.error("Ошибка favorites:", error);
        return;
      }

      const ids = (data || []).map(f => f.recipe_id);

      const favRecipes = recipes.filter(r => ids.includes(r.id));
      setFavoriteRecipes(favRecipes);
    };

    loadFavorites();
  }, [currentUser, recipes]);

  const handleRemove = async (recipeId, e) => {
    e.stopPropagation();

    try {
      const { error } = await supabase
        .from("favorites")
        .delete()
        .eq("user_id", currentUser.id)
        .eq("recipe_id", recipeId);

      if (error) {
        alert("Ошибка при удалении");
        console.error(error);
      } else {
        setFavoriteRecipes(prev => prev.filter(r => r.id !== recipeId));
        alert("Удалено");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <h2 className="auth-title" style={{ textAlign: "center", marginTop: 20, fontSize: 28, fontWeight: 'bold', color: '#ff5722' }}>
        Избранные рецепты
      </h2>

      <div className="recipes-wrapper">
        {favoriteRecipes.length === 0 && <p>Пока ничего нет</p>}

        {favoriteRecipes.map(recipe => (
          <div className="recipe-card" key={recipe.id} onClick={() => setSelectedRecipe(recipe)}>
            <img src={recipe.image_url} alt={recipe.title} className="recipe-image" />
            <div className="recipe-content">
              <h2 className="recipe-title">{recipe.title}</h2>
              <p className="recipe-category">Категория: {recipe.categories?.name}</p>
              <p className="recipe-description">{recipe.description}</p>
              <button
                className="recipe-button"
                onClick={(e) => handleRemove(recipe.id, e)}
              >Удалить из избранного</button>
            </div>
          </div>
        ))}
      </div>

      {selectedRecipe && <RecipeInfo recipe={selectedRecipe} onClose={() => setSelectedRecipe(null)} />}
    </>
  );
};

export default Favorites;
