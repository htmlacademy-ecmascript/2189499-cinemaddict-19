import Observable from '../framework/observable.js';
import { getRandomMovie, mockMovie } from '../mock/movies';

export default class MovieModel extends Observable {
  #movie = mockMovie;
  #comments = getRandomMovie().comments;

  get movie() {
    return this.#movie;
  }

  get comments() {
    return this.#comments;
  }

}

