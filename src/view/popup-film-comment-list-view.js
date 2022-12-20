import {createElement} from '../render.js';

function createPopupFilmCommentListTemplate() {
  return '<ul class="film-details__comments-list"></ul>';
}

export default class PopupFilmCommentListView {
  #element = null;
  get template() {
    return createPopupFilmCommentListTemplate();
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
