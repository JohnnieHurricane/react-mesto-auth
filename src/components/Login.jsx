import React from "react";
import AuthForm from "./AuthForm";

export default function Login({ onLogin }) {

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
        onLogin(state);
    }

    return (
        <section className="auth">
            <div className="auth__container">
            <AuthForm 
                onSubmit={handleSubmit}
                onChange={handleChange}
                buttonText={"Войти"}
                email = {email}
                password={password}
                title = {"Вход"}
                />
            </div>
        </section>
    )
}