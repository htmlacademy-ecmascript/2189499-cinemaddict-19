import {createElement} from '../render.js';

function createPopupFilmSectionTemplate() {
  return `<section class="film-details">
  </section>`;
}

export default class PopupFilmSectionView {
  #element = null;
  get template() {
    return createPopupFilmSectionTemplate();
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
