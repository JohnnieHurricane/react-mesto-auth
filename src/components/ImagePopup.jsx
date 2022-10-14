function ImagePopup(props) {
  const { isOpen, onClose, card, onCardClick } = props
  return (
    <div className={`popup popup_type_view ${isOpen ? `popup_opened` : ""}`}>
      <div className="popup__review">
        <button className="popup__close popup__close_type_view" onClick={onClose} type="button"></button>
        <img src={card.link} alt={card.name} className="popup__card-image" onClick={onCardClick} />
        <p className="popup__card-title">{card.name}</p>
      </div>
    </div>
  )
}

export default ImagePopup