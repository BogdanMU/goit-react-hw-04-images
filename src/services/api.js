import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '30634050-07972830b8543a44b224b68c4';
const IMAGES_PER_PAGE = 12;

axios.defaults.baseURL = BASE_URL;
axios.defaults.params = {
  key: API_KEY,
  image_type: 'photo',
  orientation: 'horizontal',
  per_page: IMAGES_PER_PAGE,
};

export const getPictures = async (query, page) => {
  const config = {
    params: {
      q: query,
      page: page,
    },
  };
  // const searchQuery = `?q=${query}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`;
  const response = await axios.get('', config);
  return response.data;
};
