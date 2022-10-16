import React from 'react'
import PopupWithForm from './PopupWithForm'

function AddPlacePopup(props) {
  const { onAddPlace, isOpen, onClose } = props

  const [image, setImage] = React.useState('')
  const [description, setDescription] = React.useState('')

  function handleImageChange(e) {
    setImage(e.target.value)
  }

  function handleDescriptionChange(e) {
    setDescription(e.target.value)
  }  

  function handleSubmit(e) {
    e.preventDefault()

    onAddPlace({
      name : description,
      link : image,
    })
  }

  React.useEffect(() => {
    if (!isOpen) {
      setImage('')
      setDescription('')
    }
  }, [isOpen])

  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={(e) => handleSubmit(e)}
      name="edit-avatar"
      title="Новое место"
      buttonText="Создать">
      <div>
        <div className="popup__input-wrapper">
          <input
            type="text"
            name="popupNewTitle"
            className="popup__input popup__name"
            minLength="2"
            maxLength="30"
            placeholder="Название"
            value={description}
            onChange={handleDescriptionChange}
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
            value={image}
            onChange={handleImageChange}
            required
          />
          <span className="popup__input-error popupNewLink-error"></span>
        </div>        
      </div>
    </PopupWithForm>
  )
}

export default AddPlacePopup