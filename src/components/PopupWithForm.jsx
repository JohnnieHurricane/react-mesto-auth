import React from 'react'

function PopupWithForm(props) {

const { name, isOpen, onClose, title, onSubmit, children, buttonText } = props

  return (
    <div
      className={`popup popup_type_${name} ${isOpen ? `popup_opened` : ""}`}>
      <div
        className="popup__container">
        <button
          className='popup__close'
          onClick={onClose}
          type="button">
        </button>
        <div className="popup__edit-window">
          <h2 className="popup__title">{title}</h2>
          <form className="popup__form-element popup__form"
            name={name}
            onSubmit={onSubmit}
            noValidate>
            {children}
            <button type="submit" className="popup__save">
          {buttonText}
        </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default PopupWithForm