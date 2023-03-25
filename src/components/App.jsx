import { useState, useEffect } from 'react';
import Loader from 'components/Loader/Loader';
import * as API from 'services/api';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Modal from './Modal/Modal';
import Button from './Button/Button';

export const App = () => {
  const [photos, setPhotos] = useState([]);
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [largeImage, setLargeImage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isShownModal, setIsShownModal] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [imageAlt, setImageAlt] = useState('');

  // const scrollToNextPage = () => {
  //   const pageHeight = document.documentElement.scrollHeight;
  //   const windowHeight = window.innerHeight * 2;
  //   const scrollDistance = pageHeight + windowHeight;
  //   window.scrollTo({
  //     top: scrollDistance,
  //     behavior: "auto"
  //   });
  // };

  const getPhotos = async (query, page) => {
    setIsLoading(true);

    try {
      const response = await API.fetchImages(query, page);

      if (response.totalHits < 12 || response.hits.length < 12) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      if (response.totalHits === 0) {
        alert(`There is no photos for ${query} query`);
      }
      setPhotos(prevPhotos => [...prevPhotos, ...response.hits]);
      //  scrollToNextPage();
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!searchQuery) {
      return;
    }
    getPhotos(searchQuery, page);
    //  scrollToNextPage();
  }, [searchQuery, page]);

  const handleSearchSubmit = query => {
    if (searchQuery === query) {
      return;
    }

    setSearchQuery(query);
    setIsVisible(false);
    setPhotos([]);
    setPage(1);
  };

  const loadMoreButton = () => {
    setPage(prevPage => prevPage + 1);
    setIsLoading(true);
  };

  const toggleModal = (image, imageTags) => {
    setIsShownModal(prevIsShownModal => !prevIsShownModal);
    setLargeImage(image);
    setImageAlt(imageTags);
  };

  return (
    <div className="App">
      <Searchbar onSubmit={handleSearchSubmit} />
      {error && <p>Something went wrong :( Try again later!</p>}
      {photos.length > 0 && (
        <ImageGallery
          photos={photos}
          toggleModal={toggleModal}
          onLoadMoreClick={loadMoreButton}
        />
      )}
      {isLoading && <Loader />}
      {isVisible && !isLoading && <Button onClick={loadMoreButton} />}
      {isShownModal && (
        <Modal image={largeImage} onClose={toggleModal} alt={imageAlt} />
      )}
    </div>
  );
};
