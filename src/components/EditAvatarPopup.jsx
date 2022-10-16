import React from 'react'
import PopupWithForm from './PopupWithForm'


function EditAvatarPopup(props) {

  const avatarRef = React.useRef()
  const { onUpdateAvatar, isOpen, onClose } = props

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }

  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={(e => handleSubmit(e))}
      name="edit-avatar"
      title="Обновить аватар"
      buttonText="Сохранить">
      <div>
        <div className="popup__input-wrapper">
          <input
            type="url"
            name="avatar"
            className="popup__input popup__new-link"
            placeholder="Ссылка на картинку"
            ref={avatarRef}
            required
          />
          <span className="popup__input-error avatar-error"></span>
        </div>
      </div>
    </PopupWithForm>
  )
}

export default EditAvatarPopup