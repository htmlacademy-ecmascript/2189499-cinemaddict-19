
import { mockComments } from '../mock/movies.js';
import { humanizeReleaseDate } from '../utils/date-transform.js';
import AbstractView from '../framework/view/abstract-view.js';
function createPopupFilmCommentStructureTemplate(commentId) {
  console.log(mockComments);
  console.log(commentId);
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

export default class PopupFilmCommentStructureView extends AbstractView {
  #commentId = null;
  constructor(commentId) {
    super();
    this.#commentId = commentId;
  }

  get template() {
    return createPopupFilmCommentStructureTemplate(this.#commentId);
  }

}
