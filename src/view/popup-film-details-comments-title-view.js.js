import {createElement} from '../render.js';

function createPopupFilmDetailsCommentsTitleTemplate(commentsCount) {
  const {comments} = commentsCount;
  return `<h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${comments.length}</span></h3>`;
}

export default class PopupFilmDetailsCommentsTitleView {
  #element = null;
  #commentsCount = null;

  constructor(commentsCount) {
    this.#commentsCount = commentsCount;
  }

  get template() {
    return createPopupFilmDetailsCommentsTitleTemplate(this.#commentsCount);
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
