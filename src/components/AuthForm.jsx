import React from "react";

export default function AuthForm(props) {
    const {onSubmit, onChange, buttonText, email, password, title } = props
    return (
        <form
            className="auth__form"
            name="register"
            onSubmit={onSubmit}>
            <h3 className="auth__title">{title}</h3>
            <input
                type="email"
                name="email"
                id="email"
                className="auth__input auth__input_type_email"
                placeholder="Email"
                minLength="2"
                maxLength="40"
                value={email}
                onChange={onChange}
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
                onChange={onChange}
                required
            />
            <button type="submit" className="auth__submit-button">
                {buttonText}
            </button>
        </form>
    )
}