// import { useEffect } from 'react';
import PropTypes from 'prop-types';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';


import StyledUl from './ImageGallery.styled';
// import PropTypes from 'prop-types'


export const ImageGallery = ({ photos, toggleModal}) => {
  // const handleScroll = () => {
  //   window.scrollTo({
  //     top: document.documentElement.scrollHeight,
  //     behavior: "smooth",
  //   });
  // };

  // useEffect(() => {
  //   handleScroll();
  // }, []);
  
  return (
   <>
   
    <StyledUl>
    
      {photos.map(({ id, webformatURL, largeImageURL, tags }) => {
        return (
          <ImageGalleryItem
            key={id}
            webformatURL={webformatURL}
            largeImageURL={largeImageURL}
            tags={tags}
            id={id}
            toggleModal={toggleModal}
          />
        );
      })}
    </StyledUl>
    {/* {handleScroll()} */}
     
     </>

  );
};



ImageGallery.propTypes = {
    photos: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    webformatURL: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
    
  }))
};

export default ImageGallery;


