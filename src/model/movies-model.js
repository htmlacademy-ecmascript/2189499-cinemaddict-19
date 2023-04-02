import { UpdateType } from '../const.js';
import Observable from '../framework/observable.js';
import { adaptToClient } from '../utils/common.js';

export default class MovieModel extends Observable {
  #movieApiService = null;
  #movie = [];

  constructor({movieApiService}) {
    super();
    this.#movieApiService = movieApiService;
  }

  get movie() {
    return this.#movie;
  }

  set movie(movie) {
    this.#movie = movie;
  }

  async init() {
    try {
      const movie = await this.#movieApiService.movie;
      this.#movie = movie.map(adaptToClient);
    } catch(err) {
      this.#movie = [];
    }
    this._notify(UpdateType.INIT);
  }

  async updateMovie(updatedType, update) {
    const index = this.#movie.findIndex((movie) => movie.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting film');
    }

    try {
      const response = await this.#movieApiService.updateMovie(update);
      const adaptedMovie = adaptToClient(response);

      this.#movie = [
        ...this.#movie.slice(0, index),
        adaptedMovie,
        ...this.#movie.slice(index + 1)
      ];
      this._notify(updatedType, adaptedMovie);
    } catch(err) {
      throw new Error('Can\'t update card');
    }
  }
}

