import "./Modal.scss";
import { Component } from "react";
import { createPortal } from 'react-dom';

const modalRoot = document.querySelector('#modal-root');

class Modal extends Component {

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeydown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeydown);
  }

  handleKeydown = event => {
    if (event.code === 'Escape') {
      this.props.handleModal();
    }
  };

  handleOverlayClick = event => {
    if (event.currentTarget === event.target) {
      this.props.handleModal();
    }
  };



    render() {
        return createPortal(
            <div className="Overlay" onClick={this.handleOverlayClick}>
                <div className="Modal">
                    <img src={this.props.src} alt={this.props.alt} />
                </div>
            </div>,
            modalRoot
        )
    }
} 

export default Modal;