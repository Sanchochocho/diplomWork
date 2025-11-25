import "./Header.css"
import { Link } from "react-router-dom";

const Header = () => {
    return(
        <header className="header">
            <div className="header-container">
                <a className="logo">
                  🍽️ CookBook
                </a>
                <nav className="nav">
                  <Link className="nav-link" to='/'>Рецепты</Link>
                  <Link className="nav-link" to='/favorites'>Избранное</Link>
                </nav>

                <div className="auth-buttons">
                  <a className="btn login">Войти</a>
                  <a className="btn register">Регистрация</a>
                </div>
            </div>
        </header>
    )
}

export default Header;