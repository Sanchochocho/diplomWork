import { useEffect, useState } from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Header from "./Header/Header.jsx";
import "./App.css";
import Recipe from "./Recipe/Recipe.jsx";
import Search from "./Search/Search.jsx";
import Favorites from "./Favorites/Favorites.jsx";

function App() {
  const [recipes, setRecipes] = useState([]);
  console.log(recipes);
  
  useEffect(() => {
    fetch("http://localhost:5000/users")
      .then(res => res.json())
      .then(data => setRecipes(data))
      .catch(err => console.error(err));
  }, []);

  console.log(recipes);
  
  return (
    <BrowserRouter>
      <Header/>
      <Search onSearch={(value) => console.log("Searching for:", value)} />
      <Routes>
        <Route path='/' element={<Recipe recipes={recipes} />} />
        <Route path='/favorites' element={<Favorites/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;