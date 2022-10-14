import React from 'react';
import { Route, Switch } from 'react-router-dom';

class Api {
    constructor({ host, token }) {
        this._host = host;
        this._token = token;
        this.state = {
            loggedIn: false
          }
    }

    getCards() {
        return fetch(`${this._host}/cards`, {
            headers: this._token
        })
            .then(this._checkResolve);
    }

    getUserInfoFromServer() {
        return fetch(`${this._host}/users/me`, {
            headers: this._token,
            body: JSON.stringify(),
        })
            .then(this._checkResolve);
    }

    _checkResolve(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ай-яй-яй-яй! А кто это сделал?!: ${res.status}`);
    }
    //res.ok ? res.json() : Promise.reject(`Ай-яй-яй-яй! А кто это сделал?!: ${res.status}`);
    //не работает в таком формате :(

    patchUserAvatarToServer(data) {
        return fetch(`${this._host}/users/me/avatar`, {
            method: "PATCH",
            headers: this._token,
            body: JSON.stringify({
                avatar: data.avatar,
            }),
        })
            .then(this._checkResolve);
    }

    patchUserInfoToServer(data) {
        return fetch(`${this._host}/users/me`, {
            method: "PATCH",
            headers: this._token,
            body: JSON.stringify({
                name: data.name,
                about: data.about,
            }),
        })
            .then(this._checkResolve);
    }

    postCard(card) {
        return fetch(`${this._host}/cards`, {
            method: "POST",
            headers: this._token,
            body: JSON.stringify(card),
        })
            .then(this._checkResolve);
    }

    deleteCard(id) {
        return fetch(`${this._host}/cards/${id}`, {
            method: "DELETE",
            headers: this._token,
        })
            .then(this._checkResolve);
    }

    changeLikeCardStatus(id, isLiked) {
        if (isLiked) {
            return fetch(`${this._host}/cards/${id}/likes`, {
                method: "PUT",
                headers: this._token,
            })
                .then(this._checkResolve);
        } else {
            return fetch(`${this._host}/cards/${id}/likes`, {
                method: "DELETE",
                headers: this._token,
            })
                .then(this._checkResolve);
        }
    }
}

const api = new Api(({
    host: "https://mesto.nomoreparties.co/v1/cohort-47",
    token: {
        authorization: "0cd2188b-f25f-415c-a9b6-c2be13a1732d",
        "Content-Type": "application/json",
    },
}))

export default api