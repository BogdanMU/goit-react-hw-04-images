import axios from 'axios';

// https:pixabay.com/api/?q=cat&page=1&key=your_key&image_type=photo&orientation=horizontal&per_page=12
const BASE_URL = 'https:pixabay.com/api';
const API_KEY = '30634050-07972830b8543a44b224b68c4';
export const getPictures = async (query, page) => {
  const searchQuery = `?q=${query}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`;
  const response = await axios.get(`${BASE_URL}${searchQuery}`);
  return response.data;
};
