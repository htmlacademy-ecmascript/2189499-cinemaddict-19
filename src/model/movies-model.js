import { getRandomMovie } from '../mock/movies';

const MOVIE_COUNT = 18;

export default class MovieModel {
  #movie = Array.from({length: MOVIE_COUNT}, getRandomMovie);
  #comments = getRandomMovie().comments;

  get movie() {
    return this.#movie;
  }

  get comments() {
    return this.#comments;
  }

}

