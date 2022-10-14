import React from "react";
import { Link } from "react-router-dom";

export default function Register({ onRegister }) {

    const [state, setState] = React.useState({
        email: "",
        password: "",
    });
    const { email, password } = state;

    function handleChange(e) {
        const { name, value } = e.target;
        setState(old => ({
            ...old,
            [name]: value,
        }));
    }

    function handleSubmit(e) {
        e.preventDefault();
        onRegister(email, password);
    }

    return (
        <section className="auth">
            <div className="auth__container">
                <form
                    className="auth__form"
                    name="register"
                    onSubmit={handleSubmit}>
                    <h3 className="auth__title">Регистрация</h3>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        className="auth__input auth__input_type_email"
                        placeholder="Email"
                        minLength="2"
                        maxLength="40"
                        value={email}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="password"
                        name="password"
                        id="password"
                        className="auth__input auth__input_type_password"
                        placeholder="Пароль"
                        minLength="2"
                        maxLength="40"
                        value={password}
                        onChange={handleChange}
                        required
                    />
                    <button type="submit" className="auth__submit-button">
                        Зарегистрироваться
                    </button>
                </form>
                <h3 className="auth__text">
                    Уже зарегестрированы?
                    <Link className="auth__link" to="/sign-in">
                        " Войти"
                    </Link>
                </h3>
            </div>
        </section>
    )
}