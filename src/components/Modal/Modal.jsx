import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import s from './Modal.module.css';
import PropTypes from 'prop-types';

const modalRoot = document.getElementById('modal-root');

const Modal = ({ closeModal, largeImage }) => {
  useEffect(() => {
    const handleKeyDown = e => {
      if (e.code === 'Escape') {
        return closeModal();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [closeModal]);

  const handleBackdropClick = event => {
    if (event.currentTarget === event.target) {
      closeModal();
    }
  };

  return createPortal(
    <div className={s.Overlay} onClick={handleBackdropClick}>
      <div className={s.Modal}>
        <img src={largeImage} alt="" />
      </div>
    </div>,
    modalRoot
  );
};

Modal.propTypes = {
  largeImage: PropTypes.string.isRequired,
  closeModal: PropTypes.func.isRequired,
};

export default Modal;
