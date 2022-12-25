
import {createElement} from '../render.js';
import { mockComments } from '../mock/movies.js';
import { humanizeReleaseDate } from '../utils.js';
function createPopupFilmCommentStructureTemplate(commentId) {
  return `<li class="film-details__comment">
  <span class="film-details__comment-emoji">
    <img src="./images/emoji/${mockComments[commentId].emotion}" width="55" height="55" alt="emoji-${mockComments[commentId].emotion}">
  </span>
  <div>
    <p class="film-details__comment-text">${mockComments[commentId].comment}</p>
    <p class="film-details__comment-info">
      <span class="film-details__comment-author">${mockComments[commentId].author}</span>
      <span class="film-details__comment-day">${humanizeReleaseDate(mockComments[commentId].date)}</span>
      <button class="film-details__comment-delete">Delete</button>
    </p>
  </div>
</li>`;
}

export default class PopupFilmCommentStructureView {
  #commentId = null;
  #element = null;
  constructor(commentId) {
    this.#commentId = commentId;
  }

  get template() {
    return createPopupFilmCommentStructureTemplate(this.#commentId);
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
