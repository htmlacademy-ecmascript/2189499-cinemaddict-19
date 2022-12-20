import {createElement} from '../render.js';

function createFilmListTitleTemplate() {
  return '<h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>';
}

export default class FilmListTitleView {
  #element = null;
  get template() {
    return createFilmListTitleTemplate();
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
