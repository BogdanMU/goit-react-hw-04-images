import { useEffect } from 'react';
import { Backdrop, ModalWindow } from './Modal.styled';

export const Modal = ({ image, onCloseModal }) => {
  useEffect(() => {
    window.addEventListener('keydown', onCloseModal);

    return () => {
      window.removeEventListener('keydown', onCloseModal);
    };
  }, [onCloseModal]);

  const closeModal = event => {
    if (event.code === 'Escape') {
      onCloseModal();
      return;
    }
    if (event.currentTarget !== event.target) {
      return;
    }

    onCloseModal();
  };

  return (
    <Backdrop onClick={closeModal}>
      <ModalWindow>
        <img src={image} alt="" />
      </ModalWindow>
    </Backdrop>
  );
};
