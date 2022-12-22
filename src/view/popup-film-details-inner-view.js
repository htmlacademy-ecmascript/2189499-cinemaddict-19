import {createElement} from '../render.js';

function createPopupFilmDetailsInnerTemplate() {
  return '<div class="film-details__inner"></div>';
}

export default class PopupFilmDetailsInnerView {
  #element = null;
  get template() {
    return createPopupFilmDetailsInnerTemplate();
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
