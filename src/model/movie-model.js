import { getRandomMovie } from '../mock/movies';

const MOVIE_COUNT = 5;

export default class MovieModel {
  movie = Array.from({length: MOVIE_COUNT}, getRandomMovie);

  getMovie() {
    console.log(this.movie);
    return this.movie;
  }
}
