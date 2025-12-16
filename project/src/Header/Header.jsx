import "./Header.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

const Header = ({ currentUser, onLogout }) => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("user");
    if (onLogout) onLogout();
    navigate("/login");
    setMenuOpen(false);
  };

  return (
    <header className="header">
      <div className="header-container">

        <a className="logo">CookBook</a>

        <button className="burger" onClick={() => setMenuOpen(!menuOpen)}>
          ☰
        </button>

        <nav className="nav">
          <Link className="nav-link" to="/">Рецепты</Link>
          <Link className="nav-link" to="/favorites">Избранное</Link>
        </nav>

        <div className="auth-buttons">
          {!currentUser && (
            <>
              <Link className="btn login" to="/login">Войти</Link>
              <Link className="btn register" to="/register">Регистрация</Link>
            </>
          )}

          {currentUser && (
            <>
              <Link className="profile-link" to="/profile">Профиль</Link>
              <button className="logout-button" onClick={handleLogout}>Выйти</button>
            </>
          )}
        </div>
      </div>

      {menuOpen && (
        <div className="mobile-menu">
          <Link to="/" onClick={() => setMenuOpen(false)}>Рецепты</Link>
          <Link to="/favorites" onClick={() => setMenuOpen(false)}>Избранное</Link>

          {!currentUser && (
            <>
              <Link to="/login" onClick={() => setMenuOpen(false)}>Войти</Link>
              <Link to="/register" onClick={() => setMenuOpen(false)}>Регистрация</Link>
            </>
          )}

          {currentUser && (
            <>
              <Link to="/profile" onClick={() => setMenuOpen(false)}>Профиль</Link>
              <button onClick={handleLogout} className="logout-mobile">Выйти</button>
            </>
          )}
        </div>
      )}
    </header>
  );
};

export default Header;
