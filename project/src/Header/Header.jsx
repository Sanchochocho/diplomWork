import "./Header.css";
import { Link, useNavigate } from "react-router-dom";

const Header = ({ currentUser, onLogout }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    if (onLogout) onLogout();
    navigate("/login");
  };

  return (
    <header className="header">
      <div className="header-container">
        <a className="logo">CookBook</a>

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
            <button className="logout-button" onClick={handleLogout}>
              Выйти
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;