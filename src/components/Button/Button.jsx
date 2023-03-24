import React from 'react'
import StyledButton from './Button.styled'
import PropTypes from 'prop-types'

const Button = ({onClick}) => {
  // window.scrollTo({
  //   top: document.documentElement.scrollHeight,
  //   behavior: "smooth",
  // });
  return (
    <StyledButton type='button'onClick={onClick}>Load more</StyledButton>
  )
}

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default Button
