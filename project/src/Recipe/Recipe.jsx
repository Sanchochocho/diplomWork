import './Recipe.css';
import { useState } from "react";
import RecipeInfo from "../RecipeInfo/RecipeInfo";

const Recipe = ({ recipes }) => {
    const [selectedRecipe, setSelectedRecipe] = useState(null);

    // Пагинация
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10; // Сколько карточек на странице

    // Индексы для текущей страницы
    const lastItemIndex = currentPage * itemsPerPage;
    const firstItemIndex = lastItemIndex - itemsPerPage;

    // Карточки, которые будут отображаться
    const currentRecipes = recipes.slice(firstItemIndex, lastItemIndex);

    // Количество страниц
    const totalPages = Math.ceil(recipes.length / itemsPerPage);

    return (
        <>
            <div className="recipes-wrapper">
                {currentRecipes.map((recipe, index) => (
                    <div className="recipe-card" key={index}>
                        <img
                            src={recipe.image_url}
                            alt={recipe.name}
                            className="recipe-image"
                        />

                        <div className="recipe-content">
                            <h2 className="recipe-title">{recipe.title}</h2>

                            <p className="recipe-category">Категория: {recipe.categories?.name}</p>

                            <p className="recipe-description">{recipe.description}</p>

                            <button
                                onClick={() => setSelectedRecipe(recipe)}
                                className="recipe-button"
                            >
                                Подробнее →
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* PAGINATION BUTTONS */}
            <div className="pagination">
                <button
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(prev => prev - 1)}
                >
                    ← Назад
                </button>

                <span>{currentPage} / {totalPages}</span>

                <button
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage(prev => prev + 1)}
                >
                    Вперёд →
                </button>
            </div>

            {selectedRecipe && (
                <RecipeInfo
                    recipe={selectedRecipe}
                    onClose={() => setSelectedRecipe(null)}
                />
            )}
        </>
    );
};

export default Recipe;
