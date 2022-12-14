import {createElement} from '../render.js';

function createPopupFilmDetailsBottomContainerTemplate() {
  return '<div class="film-details__bottom-container"></div>';
}

export default class PopupFilmDetailsBottomContainerView {
  getTemplate() {
    return createPopupFilmDetailsBottomContainerTemplate();
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
