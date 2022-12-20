import { useEffect } from 'react';
import { Backdrop, ModalWindow } from './Modal.styled';

export const Modal = ({ image, onCloseModal }) => {
  useEffect(() => {
    window.addEventListener('keydown', closeModalOnEscape);

    return () => {
      window.removeEventListener('keydown', closeModalOnEscape);
    };
  });

  const closeModalOnEscape = event => {
    if (event.code === 'Escape') {
      onCloseModal();
    }
  };

  const closeModalOnClick = event => {
    if (event.currentTarget !== event.target) {
      return;
    }

    onCloseModal();
  };

  return (
    <Backdrop onClick={closeModalOnClick}>
      <ModalWindow>
        <img src={image} alt="" />
      </ModalWindow>
    </Backdrop>
  );
};
