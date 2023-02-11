
import { mockComments } from '../mock/movies.js';
import { humanizeCommentDate } from '../utils/date-transform.js';
import AbstractView from '../framework/view/abstract-view.js';
function createPopupFilmCommentStructureTemplate(commentId) {
  return `<li class="film-details__comment">
  <span class="film-details__comment-emoji">
    <img src="./images/emoji/${mockComments[commentId].emotion}" width="55" height="55" alt="emoji-${mockComments[commentId].emotion}">
  </span>
  <div>
    <p class="film-details__comment-text">${mockComments[commentId].comment}</p>
    <p class="film-details__comment-info">
      <span class="film-details__comment-author">${mockComments[commentId].author}</span>
      <span class="film-details__comment-day">${humanizeCommentDate(mockComments[commentId].date)}</span>
      <button class="film-details__comment-delete">Delete</button>
    </p>
  </div>
</li>`;
}

export default class PopupFilmCommentStructureView extends AbstractView {
  #commentId = null;
  #hadleDeleteCommet = null;
  constructor(commentId, hadleDeleteCommet) {
    super();
    this.#commentId = commentId;

    this.#hadleDeleteCommet = hadleDeleteCommet;

    this.element.querySelector('.film-details__comment-delete')
      .addEventListener('click', this.#daleteCommentHandler);
  }

  get template() {
    return createPopupFilmCommentStructureTemplate(this.#commentId);
  }

  #daleteCommentHandler() {
    this.#hadleDeleteCommet();
  }

}
