import format from 'date-fns/format';
import type { Movie, MovieResponse, MovieListResponse } from '../types/Movie';
 
const API_URL = 'https://api.themoviedb.org/3/movie';
const API_KEY = 'e08815ebb9a68b5816a9e3ae26b751e1';
const IMAGE_PREFIX = 'https://image.tmdb.org/t/p/w500/';

const getMovieList = async (endpoint: string): Promise<MovieListResponse<Movie[]>> => {
  const response = await fetch(`${API_URL}/${endpoint}?api_key=${API_KEY}`);
  const data: MovieListResponse<MovieResponse[]> = await response.json();

  return {
    ...data,
    results: data.results.map(parseMovies) as Movie[]
  }
}

function parseMovies(movie: MovieResponse): Movie {
  return {
    id: movie.id,
    image: `${IMAGE_PREFIX}${movie.poster_path}`,
    overview: movie.overview,
    releaseDate: parseDate(movie.release_date),
    title: movie.title
  }
}

function parseDate(releaseDate: string): string {
  return format(new Date(`${releaseDate}T00:00:00`), 'd MMM yyyy')
}

export default getMovieList;
