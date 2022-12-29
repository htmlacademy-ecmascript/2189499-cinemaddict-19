import {createElement} from '../render.js';

function createNoMovieTemplate() {
  return '<h2 class="films-list__title">There are no movies in our database</h2>';
}

export default class NoMovieView {
  #element = null;

  get template() {
    return createNoMovieTemplate();
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  removeElement() {
    this.#element = null;
  }
}
