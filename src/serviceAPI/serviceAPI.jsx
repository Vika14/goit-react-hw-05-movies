import axios from 'axios';

const BASE_URL = 'https://api.themoviedb.org/3/';
const API_KEY = '6ae00e7dceba297493d536b74343e282';

export const getMovieTrending = async () => {
  try {
    const fetchLink = `${BASE_URL}/trending/movie/day?api_key=${API_KEY}`;
    const response = await axios.get(fetchLink);
    return response;
  } catch (error) {
    console.error('Oops, there is no movies');
  }
};

export const getMovieName = async searchQuery => {
  try {
    const fetchLink = `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${searchQuery}`;
    const response = await axios.get(fetchLink);
    return response;
  } catch (error) {
    console.error('Oops, there is no movies');
  }
};

export const getMovieInfo = async movieId => {
  try {
    const fetchLink = `${BASE_URL}movie/${movieId}?api_key=${API_KEY}`;
    const response = await axios.get(fetchLink);
    return response;
  } catch (error) {
    console.error('Oops, there is no movies');
  }
};

export const getMovieCast = async movieId => {
  try {
    const fetchLink = `${BASE_URL}movie/${movieId}/credits?api_key=${API_KEY}`;
    const response = await axios.get(fetchLink);
    return response;
  } catch (error) {
    console.error('Oops, there is no movies');
  }
};

export const getMovieReviews = async movieId => {
  try {
    const fetchLink = `${BASE_URL}movie/${movieId}/reviews?api_key=${API_KEY}`;
    const response = await axios.get(fetchLink);
    return response;
  } catch (error) {
    console.error('Oops, there is no movies');
  }
};
