import axios from 'axios';
axios.defaults.baseURL = 'https://pixabay.com/api';

const API_KEY = '26793641-c5f33c7d474ec2bb748918a6c';
const settings = '&image_type=photo&orientation=horizontal&per_page=12';

export const getPictures = async (searchQuery, page) => {
  const response = await axios.get(
    `/?q=${searchQuery}&key=${API_KEY}&page=${page}${settings}`
  );
  return response.data.hits;
};

export default getPictures;
