import React, { useEffect } from 'react';
import { Route, Switch, Router, useHistory } from 'react-router-dom';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import AddPlacePopup from './AddPlacePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import ImagePopup from './ImagePopup';
import Login from './Login';
import Register from './Register';
import ProtectedRoute from './ProtectedRoute';
import InfoTooltip from './InfoTooltip';
import api from '../utils/api';
import * as auth from '../utils/Auth.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import DeleteCardPopup from './DeleteCardPopup';

function App() {

  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = React.useState(false);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = React.useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([])

  const [isRegister, setIsRegister] = React.useState(false);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [mail, setMail] = React.useState("");

  const history = useHistory();

  useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      auth
        .getUserToken(jwt)
        .then(data => {
          if (data) {
            setMail(data.email)
            setLoggedIn(true)
            history.push("/")
          }
        })
        .catch((err) => console.log(err))
    }
  }, [history]);

  useEffect(() => {
    if (loggedIn) {
      Promise.all([api.getUserInfoFromServer(), api.getCards()])
        .then(([userData, cardsData]) => {
          setCurrentUser(userData);
          setCards(cardsData);
        })
        .catch((err) => {
          console.log(err);
          setIsRegister(false);
          setIsInfoTooltipOpen(true);
        })
    }
  }, [loggedIn]);


  function handleRegister(email, password) {
    auth
      .register(email, password)
      .then(() => {
        setIsRegister(true);
        history.push("/sign-in");
      })
      .catch((err) => {
        console.log(err);
        setIsRegister(false);
      })
      .finally(() => {
        setIsInfoTooltipOpen(true);
      })
  }

  function handleLogin({ email, password }) {
    auth
      .authorize(email, password)
      .then(jwt => {
        if (jwt.token) {
          setMail(email);
          localStorage.setItem('jwt', jwt.token);
          setLoggedIn(true);
          history.push("/");
        }
      })
      .catch((err) => {
        console.log(err);
        setIsRegister(false);
        setIsInfoTooltipOpen(true);
      })
  }

  function handleSignOut() {
    localStorage.removeItem("jwt");
    setMail("");
    setLoggedIn(false);
    history.push("/sign-in");
  }


  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true)
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true)
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true)
  }

  function DeleteCardClick(card) {
    setSelectedCard({ ...card })
    setIsDeletePopupOpen(true)

  }


  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => console.log(err));
  }

  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((cards) => cards.filter((c) => c._id !== card._id));
      })
      .catch((err) => console.log(err));
  }

  function handleCardClick(card) {
    setSelectedCard({ ...card })
    setIsImagePopupOpen(true)
  }

  function handleUpdateUser(user) {
    api
      .patchUserInfoToServer(user)
      .then((user) => {
        setCurrentUser(user)
        closeAllPopups()
      })
      .catch((err) => console.log(err))
  }

  function handleUpdateAvatar(data) {
    api
      .patchUserAvatarToServer(data)
      .then((data) => {
        setCurrentUser(data)
        closeAllPopups()
      })
      .catch((err) => console.log(err))
  }

  function handleAddPlaceSubmit(card) {
    api
      .postCard(card)
      .then((newCard) => {
        setCards([newCard, ...cards])
        closeAllPopups()
      })
      .catch((err) => console.log(err))
  }


  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsImagePopupOpen(false)
    setIsDeletePopupOpen(false)
    setIsInfoTooltipOpen(false)
    setSelectedCard({})

  }

  return (
    <Router history={history}>
      <div className="App">
        <CurrentUserContext.Provider value={currentUser}>
          <div className="page">
            <Header loggedIn={loggedIn} onSignOut={handleSignOut} email={mail} />
            <Switch >
              <ProtectedRoute
                exact
                path="/"
                loggedIn={loggedIn}
                component={Main}
                onEditAvatar={handleEditAvatarClick}
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onCardClick={handleCardClick}
                onCardLike={handleCardLike}
                onCardDelete={DeleteCardClick}
                cards={cards}
              />
              <Route exact path="/sign-in">
                <Login
                  onLogin={handleLogin}
                  loggedIn={loggedIn}
                />
              </Route>
              <Route exact path="/sign-up">
                <Register
                  isRegister={isRegister}
                  onRegister={handleRegister}
                />
              </Route>
            </Switch>
            <Footer />
            <EditProfilePopup
              isOpen={isEditProfilePopupOpen}
              onClose={closeAllPopups}
              onUpdateUser={handleUpdateUser} />
            <AddPlacePopup
              isOpen={isAddPlacePopupOpen}
              onClose={closeAllPopups}
              onAddPlace={handleAddPlaceSubmit} />
            <EditAvatarPopup
              isOpen={isEditAvatarPopupOpen}
              onClose={closeAllPopups}
              onUpdateAvatar={handleUpdateAvatar}
            />
            <ImagePopup
              isOpen={isImagePopupOpen}
              card={selectedCard}
              onClose={closeAllPopups} />
            <DeleteCardPopup
              isOpen={isDeletePopupOpen}
              onClose={closeAllPopups}
              onAccept={handleCardDelete}
              card={selectedCard} />
          </div>
          <InfoTooltip
            success={isRegister}
            isOpen={isInfoTooltipOpen}
            onClose={closeAllPopups}
          />
        </CurrentUserContext.Provider>
      </div>
    </Router>
  );
}

export default App;
