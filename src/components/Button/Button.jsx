import React from 'react';
import StyledButton from './Button.styled';
import PropTypes from 'prop-types';

// const scrollToNextPage = () => {
//   const pageHeight = document.documentElement.scrollHeight;
//   const windowHeight = window.innerHeight * 3;
//   const scrollDistance = pageHeight + windowHeight;
//   console.log('window.innerHeight * 4 :>> ', window.innerHeight * 4);
//   window.scrollTo({
//     top: scrollDistance,
//     behavior: "auto"
//   });
// };

const Button = ({ onClick }) => {
  // scrollToNextPage();
  return (
    <StyledButton type="button" onClick={onClick}>
      Load more
    </StyledButton>
  );
};

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default Button;
