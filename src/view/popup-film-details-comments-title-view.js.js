import {createElement} from '../render.js';

function createPopupFilmDetailsCommentsTitleTemplate() {
  return '<h3 class="film-details__comments-title">Comments <span class="film-details__comments-count"></span></h3>';
}

export default class PopupFilmDetailsCommentsTitleView {
  getTemplate() {
    return createPopupFilmDetailsCommentsTitleTemplate();
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
