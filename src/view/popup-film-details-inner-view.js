import {createElement} from '../render.js';

function createPopupFilmDetailsInnerTemplate() {
  return '<div class="film-details__inner"></div>';
}

export default class PopupFilmDetailsInnerView {
  getTemplate() {
    return createPopupFilmDetailsInnerTemplate();
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
