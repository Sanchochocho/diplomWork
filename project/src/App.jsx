import { useEffect, useState } from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Header from "./Header/Header.jsx";
import "./App.css";
import Recipe from "./Recipe/Recipe.jsx";
import Favorites from "./Favorites/Favorites.jsx";
import Register from "./Auth/Register/Register.jsx";
import Login from "./Auth/Login/Login.jsx";

function App() {
  const [recipes, setRecipes] = useState([]);
  const [users, setUsers] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/recipes")
      .then(res => res.json())
      .then(data => setRecipes(data))
      .catch(err => console.error(err));
  }, []);

  useEffect(() => {
    fetch("http://localhost:5000/users")
      .then(res => res.json())
      .then(data => setUsers(data))
      .catch(err => console.error(err));
  }, []);

  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
    }
  }, []);

  useEffect(() => {
    fetch("http://localhost:5000/categories")
      .then(res => res.json())
      .then(data => setCategories(data))
      .catch(err => console.error(err));
  }, []);



  return (
    <BrowserRouter>
      <Header currentUser={currentUser} onLogout={() => setCurrentUser(null)}/>
      <Routes>
        <Route path='/' element={<Recipe recipes={recipes} currentUser={currentUser} categories={categories} />} />
        <Route path='/favorites' element={<Favorites currentUser={currentUser} recipes={recipes} />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login onLogin={setCurrentUser} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;