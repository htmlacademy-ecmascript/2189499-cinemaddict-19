
import {createElement} from '../render.js';
import { mockComments } from '../mock/movies.js';
import { humanizeReleaseDate } from '../utils.js';
function createPopupFilmCommentStructureTemplate(comment) {
  const index = comment;
  return `<li class="film-details__comment">
  <span class="film-details__comment-emoji">
    <img src="./images/emoji/${mockComments[index].emotion}" width="55" height="55" alt="emoji-${mockComments[index].emotion}">
  </span>
  <div>
    <p class="film-details__comment-text">${mockComments[index].comment}</p>
    <p class="film-details__comment-info">
      <span class="film-details__comment-author">${mockComments[index].author}</span>
      <span class="film-details__comment-day">${humanizeReleaseDate(mockComments[index].date)}</span>
      <button class="film-details__comment-delete">Delete</button>
    </p>
  </div>
</li>`;
}

export default class PopupFilmCommentStructureView {
  constructor({comment}) {
    this.comment = comment;
  }

  getTemplate() {
    return createPopupFilmCommentStructureTemplate(this.comment);
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
