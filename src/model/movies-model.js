import Observable from '../framework/observable.js';
import { mockMovie } from '../mock/movies';

export default class MovieModel extends Observable {
  #movie = mockMovie;

  get movie() {
    return this.#movie;
  }

  set movie(movie) {
    this.#movie = movie;
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

