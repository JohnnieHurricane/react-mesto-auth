import React from 'react'
import PopupWithForm from './PopupWithForm'
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup(props) {

  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');
  const currentUser = React.useContext(CurrentUserContext);
  const { isOpen, onClose, onUpdateUser } = props

  React.useEffect(() => {
    setName(currentUser.name)
    setDescription(currentUser.about)
  }, [currentUser, isOpen]);

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleDescriptionChange(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={(e) => handleSubmit(e)}
      name={"edit-profile"}
      title="Редактировать профиль">
      <div>
        <div className="popup__input-wrapper">
          <input
            type="text"
            name="name"
            className="popup__input popup__name"
            minLength="2"
            maxLength="40"
            placeholder="Введите имя"
            onChange={handleNameChange}
            value={name || ''}
            required
          />
          <span className='popup__input-error'></span>
        </div>
        <div className="popup__input-wrapper">
          <input
            type="text"
            name="about"
            minLength="2"
            maxLength="200"
            className="popup__input popup__profession"
            placeholder="Введите Вашу профессию"
            onChange={handleDescriptionChange}
            value={description || ''}
            required
          />
          <span className="popup__input-error about-error"></span>
        </div>
        <button type="submit" className="popup__save">
          Сохранить
        </button>
      </div>
    </PopupWithForm>
  )
}

export default EditProfilePopup