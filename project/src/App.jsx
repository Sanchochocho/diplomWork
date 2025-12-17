import { useEffect, useState } from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Header from "./Header/Header.jsx";
import "./App.css";
import Recipe from "./Recipe/Recipe.jsx";
import Favorites from "./Favorites/Favorites.jsx";
import Register from "./Auth/Register/Register.jsx";
import Login from "./Auth/Login/Login.jsx";
import Profile from "./Profile/Profile.jsx";
const API_URL = import.meta.env.VITE_API_URL;

function App() {
  const [recipes, setRecipes] = useState([]);
  const [users, setUsers] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  fetch(`${API_URL}/recipes`)
    .then(res => res.json())
    .then(data => {
      setRecipes(data);
      setLoading(false);
    })
    .catch(err => {
      console.error(err);
      setLoading(false);
    });
}, []);

  useEffect(() => {
    fetch(`${API_URL}/users`)
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
    fetch(`${API_URL}/categories`)
      .then(res => res.json())
      .then(data => setCategories(data))
      .catch(err => console.error(err));
  }, []);



  return (
    <BrowserRouter>
      <Header currentUser={currentUser} onLogout={() => setCurrentUser(null)}/>
      <Routes>
        <Route path='/' element={<Recipe recipes={recipes} currentUser={currentUser} categories={categories} loading={loading}/>} />
        <Route path='/favorites' element={<Favorites currentUser={currentUser} recipes={recipes} />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login onLogin={setCurrentUser} />} />
        <Route path='/profile' element={<Profile/>} />
        <Route path='*' element={<h2 className="not-found">404 Not Found</h2>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;