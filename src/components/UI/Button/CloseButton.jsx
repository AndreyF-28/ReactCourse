import React from "react";
import cl from './CloseButton.module.css'


const CloseButton = ({ onClick, ...props }) => {
    return (
        <button
            onClick={onClick}
            className={cl.closeBtn}
            aria-label="Закрыть форму"
            {...props} // Передаем все остальные пропсы
        >
            &times;
        </button>
    );
};

export default CloseButton;
