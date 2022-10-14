import logoHeader from '../images/Logo_header.png'
import React from 'react'
import { Link, Route, Switch } from "react-router-dom";

function Header({ email, onSignOut }) {
  return (
    <header className="header">
      <img className="header__logo" src={logoHeader} alt="логотип Место Россия" />
      <div className="header__wrapper">
        <Switch>
          <Route exact path="/">
            <p className="header__email">{email}</p>
            <Link
              to="/sign-in"
              className="header__link header__link_logout"
              onClick={onSignOut}
            >
              Выйти
            </Link>
          </Route>
          <Route exact path="/sign-in">
            <Link to="/sign-up" className="header__link">
              Регистрация
            </Link>
          </Route>
          <Route exact path="/sign-up">
            <Link to="/sign-in" className="header__link">
              Вход
            </Link>
          </Route>
        </Switch>
      </div>
    </header>
  )
}

export default Header