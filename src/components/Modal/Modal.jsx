import { useEffect } from 'react';
import PropTypes from 'prop-types';
import * as Css from './Modal.styled';

const Modal = ({ onClose, image, alt }) => {
  useEffect(() => {
    const handlePressESC = e => {
      console.log('object :>> ', Date.now());
      if (e.code === 'Escape') onClose();
    };
    window.addEventListener('keydown', handlePressESC);

    return () => {
      window.removeEventListener('keydown', handlePressESC);
    };
  }, [onClose]);

  const handleBackdropClick = event => {
    if (event.currentTarget === event.target) {
      onClose();
    }
  };

  return (
    <Css.StyledOverlay onClick={handleBackdropClick}>
      <Css.StyledModal>
        <img src={image} alt={alt} />
      </Css.StyledModal>
    </Css.StyledOverlay>
  );
};

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  image: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
};

export default Modal;
