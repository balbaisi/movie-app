import {
  TMDB_API_KEY,
  TMDB_API_URL,
  TMDB_IMAGE_URI,
  TMDB_IMAGE_URI_HIGH,
} from '@env';
import axios from 'axios';
import {Movie} from '../interfaces/Movie';
import {Api} from './Api';

export class TheMovieAPI extends Api {
  static apiKey: string = TMDB_API_KEY;

  static apiUrl: string = TMDB_API_URL;

  public static getUpcomingMovies(page: number): Promise<any> {
    return this.get('movie/upcoming', {
      page: page,
    });
  }

  public static getTopRatedMovies(page: number): Promise<any> {
    return this.get('movie/top_rated', {
      page: page,
    });
  }

  public static getPopularMovies(page: number): Promise<any> {
    return this.get('movie/popular', {
      page: page,
    });
  }

  public static getMovieDetails(id: number): Promise<any> {
    return this.get(`movie/${id}`);
  }

  public static getMovieCredits(id: number): Promise<any> {
    return this.get(`movie/${id}/credits`);
  }

  public static getMovieDetailsByMovies(movies: Movie[]): Promise<any> {
    return axios.all(
      movies.map(movie => TheMovieAPI.getMovieDetails(movie.id)),
    );
  }

  public static getImageUri(imagePath: string) {
    return `${TMDB_IMAGE_URI}${imagePath}`;
  }

  public static getImageUriHigh(imagePath: string) {
    return `${TMDB_IMAGE_URI_HIGH}${imagePath}`;
  }
}
