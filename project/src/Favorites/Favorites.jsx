import { useEffect, useState } from "react";
import RecipeInfo from "../RecipeInfo/RecipeInfo";
import "../Recipe/Recipe.css";
import { supabase } from "../supabaseClient";
import { ThreeDot } from "react-loading-indicators";

const Favorites = ({ recipes, currentUser }) => {
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!currentUser) {
      setFavoriteRecipes([]);
      setLoading(false);
      return;
    }

    const loadFavorites = async () => {
      setLoading(true);

      const { data, error } = await supabase
        .from("favorites")
        .select("recipe_id")
        .eq("user_id", currentUser.id);

      if (error) {
        console.error("Ошибка favorites:", error);
        setLoading(false);
        return;
      }

      const ids = (data || []).map((f) => f.recipe_id);
      const favRecipes = recipes.filter((r) => ids.includes(r.id));

      setFavoriteRecipes(favRecipes);
      setLoading(false);
    };

    loadFavorites();
  }, [currentUser, recipes]);

  const handleRemove = async (recipeId, e) => {
    e.stopPropagation();

    const { error } = await supabase
      .from("favorites")
      .delete()
      .eq("user_id", currentUser.id)
      .eq("recipe_id", recipeId);

    if (error) {
      alert("Ошибка при удалении");
      console.error(error);
      return;
    }

    setFavoriteRecipes((prev) => prev.filter((r) => r.id !== recipeId));
    alert("Удалено");
  };

  return (
    <>
      <h2
        className="auth-title"
        style={{
          textAlign: "center",
          marginTop: 20,
          fontSize: 28,
          fontWeight: "bold",
          color: "#ff5722",
        }}
      >
        Избранные рецепты
      </h2>

      {loading && (
        <div style={{ display: "flex", justifyContent: "center", marginTop: 80 }}>
          <ThreeDot color="#ff5722" size="medium" text="" />
        </div>
      )}

      {!currentUser && (
        <div className="empty-favorites">
          <h2>Пожалуйста, войдите в аккаунт, чтобы просматривать избранные рецепты.</h2>
        </div>
      )}

      {favoriteRecipes.length === 0 && !loading && currentUser && (
        <div className="empty-favorites">
          <h2>У вас нет избранных рецептов.</h2>
        </div>
      )}
      

      {!loading && (
        <div className="recipes-wrapper">

          {favoriteRecipes.map((recipe) => (
            <div
              className="recipe-card"
              key={recipe.id}
              onClick={() => setSelectedRecipe(recipe)}
            >
              <img
                src={recipe.image_url}
                alt={recipe.title}
                className="recipe-image"
              />

              <div className="recipe-content">
                <h2 className="recipe-title">{recipe.title}</h2>
                <p className="recipe-category">Категория: {recipe.categories?.name}</p>
                <p className="recipe-description">{recipe.description}</p>

                <button
                  className="recipe-button"
                  onClick={(e) => handleRemove(recipe.id, e)}
                >
                  Удалить из избранного
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {selectedRecipe && (
        <RecipeInfo recipe={selectedRecipe} onClose={() => setSelectedRecipe(null)} />
      )}
    </>
  );
};

export default Favorites;
