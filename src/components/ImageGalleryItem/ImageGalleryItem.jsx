import StyledLi from './ImageGalleryItem.styled';
import PropTypes from 'prop-types';

const ImageGalleryItem = ({
  webformatURL,
  largeImageURL,
  tags,
  toggleModal,
}) => {
  return (
    <StyledLi onClick={() => toggleModal(largeImageURL, tags)}>
      <img src={webformatURL} alt={tags} />
    </StyledLi>
  );
};

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  toggleModal: PropTypes.func.isRequired,
};

export default ImageGalleryItem;
