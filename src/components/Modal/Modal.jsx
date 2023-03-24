import { Component } from 'react';
import PropTypes from 'prop-types';
import * as Css from './Modal.styled';

class Modal extends Component {
  static propTypes = {
    onClose: PropTypes.func.isRequired,
    image: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
  };

  state = {};

  componentDidMount() {
    window.addEventListener('keydown', this.handlePressESC);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handlePressESC);
  }

  handlePressESC = e => {
    console.log('object :>> ', Date.now());
    if (e.code === 'Escape') this.props.onClose();
  };

  handleBackdropClick = event => {
    if (event.currentTarget === event.target) {
      this.props.onClose();
    }
  };

  render() {
    console.log('this.props :>> ', this.props);
    return (
      <Css.StyledOverlay onClick={this.handleBackdropClick}>
        <Css.StyledModal>
          <img src={this.props.image} alt={this.props.alt} />
        </Css.StyledModal>
      </Css.StyledOverlay>
    );
  }
}



export default Modal;
