import React from "react";
import success from "../images/success.png";
import reject from "../images/reject.png";

export default function InfoTooltip(props) {
    const { isOpen, onClose} = props
    return (
        <div
            className={`popup popup_type_info ${isOpen ? `popup_opened` : ""}`}>
            <div
                className="popup__container popup__container_type_info">
                <button
                    className='popup__close'
                    onClick={onClose}
                    type="button">
                </button>
                <div className="popup__edit-window popup__edit-window_type_info">
                    <img
                        className="popup__callback-image"
                        src={props.success ? success : reject}
                        alt={props.success ? "Вы успешно зарегистрировались!" : "Что-то пошло не так! Попробуйте ещё раз."}
                    />
                    <h2 className="popup__title popup__title_type_info">{props.success ? "Вы успешно зарегистрировались!" : "Что-то пошло не так! Попробуйте ещё раз."}</h2>
                </div>
            </div>
        </div>
    );
}