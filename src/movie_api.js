import axios from "axios";

const API_URL = "https://api.themoviedb.org/3";
const API_KEY = import.meta.env.VITE_API_ACCESS_KEY;

export const fetchMovies = async (endpoint) => {
  const url = `${API_URL}${endpoint}`;
  const options = {
    headers: {
      Authorization: API_KEY,
    },
  };

  try {
    const response = await axios.get(url, options);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const fetchTrendingMovies = () =>
  fetchMovies("/trending/movie/day?language=en-US");

export const fetchMovieDetails = (movieId) =>
  fetchMovies(`/movie/${movieId}?language=en-US`);
