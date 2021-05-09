import axios from "axios";

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '20648109-aff5f53cd54a5f40fa07937d6';

const fetchImages = ({ searchQuery = '', currentPage = 1 }) => {
    return axios
        .get(`${BASE_URL}?image_type=photo&orientation=horizontal&q=${searchQuery}&page=${currentPage}&per_page=12&key=${API_KEY}`,)
        .then(response => response.data.hits);
};

export default fetchImages;