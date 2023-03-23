import css from './Modal.module.css';
import { useEffect } from 'react';
import PropTypes from 'prop-types';

const Modal = ({ img, onClose }) => {

  const handleClose = event => {
    if (event.currentTarget === event.target) {
      onClose();
    }
  };

  const handleKeyClose = event => {
    if (event.code === 'Escape') {
      onClose();
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyClose);

    return () => {
      window.removeEventListener('keydown', handleKeyClose);
    };
  });

  return (
    <div className={css.Overlay} onClick={handleClose}>
      <div className={css.Modal}>
        <img src={img} alt="" />
      </div>
    </div>
  );
};

export default Modal;

Modal.propTypes = {
  img: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};
