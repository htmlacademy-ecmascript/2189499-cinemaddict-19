import {createElement} from '../render.js';

function createPopupFilmDetailsCommentsWrapTemplate() {
  return ' <section class="film-details__comments-wrap">';
}

export default class PopupFilmDetailsCommentsWrapView {
  #element = null;
  get template() {
    return createPopupFilmDetailsCommentsWrapTemplate();
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
