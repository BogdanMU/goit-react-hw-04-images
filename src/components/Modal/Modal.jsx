import { Component } from 'react';
import { Backdrop, ModalWindow } from './Modal.styled';

export class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.closeModal);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.closeModal);
  }

  closeModal = event => {
    if (event.code === 'Escape') {
      this.props.closeModal();
      return;
    }
    if (event.currentTarget !== event.target) {
      return;
    }

    this.props.closeModal();
  };
  render() {
    const { image } = this.props;
    return (
      <Backdrop onClick={this.closeModal}>
        <ModalWindow>
          <img src={image} alt="" />
        </ModalWindow>
      </Backdrop>
    );
  }
}
