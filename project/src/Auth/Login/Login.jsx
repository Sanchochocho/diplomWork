import { useState } from "react";
import { supabase } from "../../supabaseClient";
import bcrypt from "bcryptjs";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = ({ onLogin }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        const { data: user, error } = await supabase
            .from("users")
            .select("*")
            .eq("email", email)
            .single();

        if (error || !user) {
            setMessage("Пользователь не найден");
            return;
        }

        const isValidPassword = await bcrypt.compare(password, user.password_hash);
        if (!isValidPassword) {
            setMessage("Неверный пароль");
            return;
        }

        localStorage.setItem("user", JSON.stringify(user));
        if (onLogin) onLogin(user);
        setMessage("Успешный вход!");

        setTimeout(() => {
            navigate("/");
        }, 800);
    };


    return (
        <div className="auth-container">
            <h2 className="auth-title">Вход</h2>

            <form onSubmit={handleLogin}>
                <input
                    className="auth-input"
                    type="email"
                    placeholder="E-mail"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                <input
                    className="auth-input"
                    type="password"
                    placeholder="Пароль"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                <button className="auth-button" type="submit">Войти</button>
            </form>

            {message && <p className="auth-message">{message}</p>}
        </div>
    );
};

export default Login;