import React from "react";
import { Link } from "react-router-dom";
import AuthForm from "./AuthForm";

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
                <AuthForm 
                onSubmit={handleSubmit}
                onChange={handleChange}
                buttonText={"Зарегистрироваться"}
                email = {email}
                password={password}
                title = {"Регистрация"}
                />
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