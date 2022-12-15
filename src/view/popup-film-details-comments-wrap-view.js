import {createElement} from '../render.js';

function createPopupFilmDetailsCommentsWrapTemplate() {
  return ' <section class="film-details__comments-wrap">';
}

export default class PopupFilmDetailsCommentsWrapView {
  getTemplate() {
    return createPopupFilmDetailsCommentsWrapTemplate();
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
