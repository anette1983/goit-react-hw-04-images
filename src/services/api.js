import axios from 'axios';

// axios.defaults.baseURL = 'https://pixabay.com/api/';
const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '33296803-7dbc062ad7f8de8fe89eadd9d';


const perPage = 12;

const options = `image_type=photo&orientation=horizontal&per_page=${perPage}`;

export const fetchImages = async (searchQuery, page) => {
  const response = await axios.get(
    `${BASE_URL}?q=${searchQuery}&page=${page}&key=${API_KEY}&${options}`
  );
return response.data;
};
// для пагинации принимать еще и пейдж

