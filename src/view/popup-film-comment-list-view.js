import {createElement} from '../render.js';

function createPopupFilmCommentListTemplate() {
  return '<ul class="film-details__comments-list"></ul>';
}

export default class PopupFilmCommentListView {
  getTemplate() {
    return createPopupFilmCommentListTemplate();
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
