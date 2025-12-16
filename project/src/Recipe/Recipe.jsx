import './Recipe.css';
import { useState, useEffect } from "react";
import RecipeInfo from "../RecipeInfo/RecipeInfo";
import Search from "../Search/Search";
import { ThreeDot } from "react-loading-indicators";

const Recipe = ({ recipes, currentUser, categories, loading }) => {
    const [selectedRecipe, setSelectedRecipe] = useState(null);
    const [favorites, setFavorites] = useState([]);
    const [filter, setFilter] = useState("all");
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;


    useEffect(() => {
        if (!currentUser) {
            setFavorites([]);
            return;
        }

        fetch("http://localhost:5000/favorites")
            .then(res => res.json())
            .then(data => {
                setFavorites(data.filter(f => f.user_id === currentUser.id));
            })
            .catch(err => console.error(err));
    }, [currentUser]);

    const filteredRecipes = recipes.filter(recipe => {
        //фильтр по категории
        const categoryMatch =
            filter === "all" || recipe.category_id === filter;

        //поиск
        const query = searchQuery.toLowerCase();
        const titleMatch = recipe.title.toLowerCase().includes(query);
        const ingredientMatch = recipe.recipe_ingredients?.some(item =>
            item.ingredients.name.toLowerCase().includes(query)
        );

        const searchMatch = query === "" || titleMatch || ingredientMatch;

        return categoryMatch && searchMatch;
    });


    const handleSearch = (query) => {
        setSearchQuery(query);
        setCurrentPage(1);
    };


    const handleAddToFavorites = async (recipeId, e) => {
        e.stopPropagation();

        if (!currentUser) {
            alert("Сначала войдите в аккаунт");
            return;
        }

        const favPayload = {
            user_id: currentUser.id,
            recipe_id: recipeId
        };

        try {
            const res = await fetch("http://localhost:5000/favorites", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(favPayload)
            });

            const data = await res.json();

            if (!res.ok) {
                alert(data.message || "Ошибка при добавлении в избранное");
                return;
            }

            alert("Добавлено в избранное");
        } catch (err) {
            console.error(err);
            alert("Ошибка сервера при добавлении");
        }
    };

    const handleCategoryChange = (catId) => {
        setFilter(catId);
        setCurrentPage(1);
    };


    const totalPages = Math.ceil(filteredRecipes.length / itemsPerPage);
    const currentRecipes = filteredRecipes.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    return (
        <>
            <Search onSearch={handleSearch} onFilterSelect={handleCategoryChange} categories={categories} />

            {loading && (
                <div style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: "80px"
                }}>
                    <ThreeDot color="#ff5722" size="medium" />
                </div>
            )}

            {!loading && filteredRecipes.length === 0 && (
                <p className="no-results">Ничего не найдено</p>
            )}

            {!loading && filteredRecipes.length > 0 && (
                <div className="recipes-wrapper">
                    {currentRecipes.map(recipe => (
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
                                    onClick={(e) => handleAddToFavorites(recipe.id, e)}
                                >
                                    Добавить в избранное
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}


            {selectedRecipe && (
                <RecipeInfo
                    recipe={selectedRecipe}
                    onClose={() => setSelectedRecipe(null)}
                />
            )}

            {filteredRecipes.length > 0 && (
                <div className="pagination">
                    <button
                        className="pagination-button"
                        disabled={currentPage === 1}
                        onClick={() => setCurrentPage(currentPage - 1)}
                    >
                        ← Назад
                    </button>

                    <span className="pagination-info">{currentPage} / {totalPages || 1}</span>

                    <button
                        className="pagination-button"
                        disabled={currentPage === totalPages}
                        onClick={() => setCurrentPage(currentPage + 1)}
                    >
                        Вперёд →
                    </button>
                </div>
            )}
        </>
    );
};

export default Recipe;
