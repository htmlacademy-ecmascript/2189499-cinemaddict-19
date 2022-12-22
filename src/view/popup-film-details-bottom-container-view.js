import {createElement} from '../render.js';

function createPopupFilmDetailsBottomContainerTemplate() {
  return '<div class="film-details__bottom-container"></div>';
}

export default class PopupFilmDetailsBottomContainerView {
  #element = null;
  get template() {
    return createPopupFilmDetailsBottomContainerTemplate();
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
