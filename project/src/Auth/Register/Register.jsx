import { useState } from "react";
import { supabase } from '../../supabaseClient';
import bcrypt from "bcryptjs";
import "./Register.css";

const Register = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const handleRegister = async (e) => {
        e.preventDefault();

        const { data: existingUser } = await supabase
            .from("users")
            .select("*")
            .eq("email", email)
            .single();

        if (existingUser) {
            setMessage("Пользователь с таким email уже существует");
            return;
        }

        const passwordHash = await bcrypt.hash(password, 10);

        const { error } = await supabase
            .from("users")
            .insert([
                {
                    username,
                    email,
                    password_hash: passwordHash,
                }
            ]);

        if (error) {
            setMessage("Ошибка регистрации");
            console.log(error);
            
        } else {
            setMessage("Регистрация успешна!");
            setUsername("");
            setEmail("");
            setPassword("");
        }
    };

    return (
        <div className="auth-container">
            <h2>Регистрация</h2>

            <form onSubmit={handleRegister}>
                <input
                    type="text"
                    placeholder="Имя пользователя"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />

                <input
                    type="email"
                    placeholder="E-mail"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                <input
                    type="password"
                    placeholder="Пароль"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                <button type="submit">Зарегистрироваться</button>
            </form>

            {message && <p>{message}</p>}
        </div>
    );
};

export default Register;