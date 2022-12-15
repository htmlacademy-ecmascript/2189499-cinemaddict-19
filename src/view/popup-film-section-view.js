import {createElement} from '../render.js';

function createPopupFilmSectionTemplate() {
  return `<section class="film-details">
  </section>`;
}

export default class PopupFilmSectionView {
  getTemplate() {
    return createPopupFilmSectionTemplate();
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
