import { Component } from 'react';
import Loader from 'components/Loader/Loader';
import * as API from 'services/api';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Modal from './Modal/Modal';
import Button from './Button/Button';

export class App extends Component {
  state = {
    photos: [],
    page: 1,
    searchQuery: '',
    largeImage: '',
    isLoading: false,
    error: null,
    isShownModal: false,
    isVisible: false,
    imageAlt: '',
  };

  // shouldComponentUpdate(nextProps, nextState) {
  //   console.log('nextState.searchQuery :>> ', nextState.searchQuery);
  //   console.log('this.state.searchQuery :>> ', this.state.searchQuery);
  //   console.log('nextState !== this.state :>> ', nextState !== this.state);
  //   return nextState !== this.state;
  // }

  componentDidUpdate(prevProps, prevState) {
    const { searchQuery, page } = this.state;

    if (
      searchQuery !== prevState.searchQuery ||
      this.state.page !== prevState.page
    ) {
      this.getPhotos(searchQuery, page);
    //   if (page > 1) {
    //     window.scrollBy({
    //       top: 10000,
    //       behavior: 'smooth',
    //     });
    // }
    } else {
      return;
    }
    console.log('page > 1 :>> ', page > 1);

   
  }
  getPhotos = async (query, page) => {
    this.setState({ isLoading: true });
    // if (!query) {
    //   return;
    // }

    try {
      const response = await API.fetchImages(query, page);
      console.log('response.totalHits === 0 :>> ', response.totalHits === 0);
      console.log('response.hits.length :>> ', response.hits.length);
      if (response.totalHits < 12 || response.hits.length < 12) {
        this.setState({ isVisible: false });
      } else {
        this.setState({ isVisible: true });
      }
      if (response.totalHits === 0) {
        alert(`There is no photos for ${this.state.searchQuery} query`);
      }
      this.setState(prev => ({
        photos: [...prev.photos, ...response.hits],
      }));
    } catch (error) {
      this.setState({ error: error });
      // return Promise.reject(new Error(`There is no photos for ${this.props.searchQuery} query`))
    } finally {
      this.setState({ isLoading: false });
    }
  };

  handleSearchSubmit = searchQuery => {
    if (this.state.searchQuery === searchQuery) {
      return;
    }
    this.setState({
      searchQuery,
      isVisible: false,
      photos: [],
      page: 1,
    });
  };

  loadMoreButton = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
      isLoading: true,
    }));
  };

  toggleModal = (image, imageTags) => {
    this.setState(({ isShownModal }) => ({
      isShownModal: !isShownModal,
      largeImage: image,
      imageAlt: imageTags,
    }));
    console.log('this.state.isShownModal :>> ', this.state.isShownModal);
  };

  render() {
    const { photos, isShownModal, largeImage, isVisible, isLoading, imageAlt} =
      this.state;
      
    return (
      <div className="App">
        <Searchbar onSubmit={this.handleSearchSubmit} />
        {this.state.error && <p>Something went wrong :( Try again later!</p>}
        {photos.length > 0 && (
          <ImageGallery
            photos={photos}
            toggleModal={this.toggleModal}
            onLoadMoreClick={this.loadMoreButton}
          />
        )}
        {isLoading && <Loader />}
        {(isVisible && !isLoading) && <Button onClick={this.loadMoreButton} />}
        {isShownModal && (
          <Modal
            image={largeImage}
            onClose={this.toggleModal}
            alt={imageAlt}
          />
        )}
      </div>
    );
  }
}


/*import { useState, useEffect } from 'react';
import Loader from 'components/Loader/Loader';
import * as API from 'services/api';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Modal from './Modal/Modal';
import Button from './Button/Button';

function App() {
  const [photos, setPhotos] = useState([]);
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [largeImage, setLargeImage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isShownModal, setIsShownModal] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [imageAlt, setImageAlt] = useState('');

  useEffect(() => {
    getPhotos(searchQuery, page);
  }, [searchQuery, page]);

  async function getPhotos(query, page) {
    setIsLoading(true);

    try {
      const response = await API.fetchImages(query, page);

      if (response.totalHits < 12 || response.hits.length < 12) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }

      if (response.totalHits === 0) {
        alert(`There are no photos for the "${searchQuery}" query`);
      }

      setPhotos(prevPhotos => [...prevPhotos, ...response.hits]);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  }

  function handleSearchSubmit(query) {
    if (searchQuery === query) {
      return;
    }

    setSearchQuery(query);
    setIsVisible(false);
    setPhotos([]);
    setPage(1);
  }

  function handleLoadMoreClick() {
    setPage(prevPage => prevPage + 1);
    setIsLoading(true);
  }

  function toggleModal(image, imageAlt) {
    setIsShownModal(prevIsShownModal => !prevIsShownModal);
    setLargeImage(image);
    setImageAlt(imageAlt);
  }

  return (
    <div className="App">
      <Searchbar onSubmit={handleSearchSubmit} />
      {error && <p>Something went wrong :( Try again later!</p>}
      {photos.length > 0 && (
        <ImageGallery
          photos={photos}
          toggleModal={toggleModal}
          onLoadMoreClick={handleLoadMoreClick}
        />
      )}
      {isLoading && <Loader />}
      {isVisible && !isLoading && <Button onClick={handleLoadMoreClick} />}
      {isShownModal && (
        <Modal image={largeImage} onClose={toggleModal} alt={imageAlt} />
      )}
    </div>
  );
}

export default App;*/