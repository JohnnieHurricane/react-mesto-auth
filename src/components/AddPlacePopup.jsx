import React from 'react'
import PopupWithForm from './PopupWithForm'

function AddPlacePopup(props) {

  const titleRef = React.useRef('')
  const linkRef = React.useRef('')

  const {onAddPlace, isOpen, onClose} = props

  function handleSubmit(e) {
    e.preventDefault();

    onAddPlace({
      name: titleRef.current.value,
      link: linkRef.current.value,
    })

    titleRef.current.value = ''
    linkRef.current.value = ''
  }

  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={(e) => handleSubmit(e)}
      name="edit-avatar"
      title="Новое место">
      <div>
        <div className="popup__input-wrapper">
          <input
            type="text"
            name="popupNewTitle"
            className="popup__input popup__name"
            minLength="2"
            maxLength="30"
            placeholder="Название"
            ref={titleRef}
            required
          />
          <span className="popup__input-error popupNewTitle-error"></span>
        </div>
        <div className="popup__input-wrapper">
          <input
            type="url"
            name="popupNewLink"
            className="popup__input popup__new-link"
            placeholder="Ссылка на картинку"
            ref={linkRef}
            required
          />
          <span className="popup__input-error popupNewLink-error"></span>
        </div>
        <button type="submit" className="popup__save">
          Создать
        </button>
      </div>
    </PopupWithForm>
  )
}

export default AddPlacePopup