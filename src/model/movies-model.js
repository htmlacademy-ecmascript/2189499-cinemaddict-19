import Observable from '../framework/observable.js';
import { getRandomMovie, mockMovie } from '../mock/movies';

export default class MovieModel extends Observable {
  #movie = mockMovie;
  #comments = getRandomMovie().comments;

  get movie() {
    return this.#movie;
  }

  set movie(movie) {
    this.#movie = movie;
  }

  get comments() {
    return this.#comments;
  }


  updateMovie(updatedType, update) {
    const index = this.#movie.findIndex((movie) => movie.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting film');
    }

    this.#movie = [
      ...this.#movie.slice(0, index),
      update,
      ...this.#movie.slice(index + 1)
    ];

    this._notify(updatedType, update);
  }

}

