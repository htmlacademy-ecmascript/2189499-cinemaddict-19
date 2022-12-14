import { getRandomMovie } from '../mock/movies';

const MOVIE_COUNT = 5;

export default class MovieModel {
  movie = Array.from({length: MOVIE_COUNT}, getRandomMovie);
  popupMovie = getRandomMovie();

  getMovie() {
    return this.movie;
  }

  getPopupMovie() {
    return this.popupMovie;
  }

}

