import React from 'react'
import PopupWithForm from './PopupWithForm'


function DeleteCardPopup(props) {

  const { isOpen, onClose, onAccept, card } = props

  function handleSubmit(e) {
    e.preventDefault()
    onAccept(card)
    onClose()
  }

  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={(e) => handleSubmit(e)}
      name="delete-card"
      title="Вы уверены?">
      <button className="popup__save popup__save_delete-card" type="submit">Да</button>
    </PopupWithForm>
  )

}

export default DeleteCardPopup