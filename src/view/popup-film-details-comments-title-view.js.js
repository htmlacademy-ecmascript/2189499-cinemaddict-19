import {createElement} from '../render.js';

function createPopupFilmDetailsCommentsTitleTemplate(commentsCount) {
  console.log(commentsCount.movie.comments.length);
  return `<span class="film-details__comments-count">${commentsCount.movie.comments.length}</span>`;
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
