import { humanizeCommentDate } from '../utils/date-transform.js';
import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';

function createPopupFilmCommentStructureTemplate(commentId, comments, index, {isDisabled, isDeleting}) {
  return `<li class="film-details__comment">
  <span class="film-details__comment-emoji">
    <img src="./images/emoji/${comments.emotion}.png" width="55" height="55" alt="emoji-${comments.emotion}.png">
  </span>
  <div>
    <p class="film-details__comment-text">${comments.comment}</p>
    <p class="film-details__comment-info">
      <span class="film-details__comment-author">${comments.author}</span>
      <span class="film-details__comment-day">${humanizeCommentDate(comments.date)}</span>
      <button class="film-details__comment-delete" ${isDisabled ? 'disabled' : ''}>${isDeleting ? 'Deleting...' : 'Delete'}</button>
    </p>
  </div>
</li>`;
}

export default class PopupFilmCommentStructureView extends AbstractStatefulView {
  #commentId = null;
  #hadleDeleteCommet = null;
  #commentsModel = null;
  #comments = null;
  #indexOfComment = null;
  #commentsData = null;

  #initialState = {
    isDisabled: false,
    isDeleting: false
  };


  constructor(commentId, indexOfComment, {hadleDeleteCommet, comments, commentsModel}) {
    super();
    this.#indexOfComment = indexOfComment;
    this.#commentId = commentId;
    this.#commentsModel = commentsModel;
    this.#hadleDeleteCommet = hadleDeleteCommet;
    this.#comments = comments;
    this._setState(this.#initialState);
    this._restoreHandlers();

  }

  _restoreHandlers() {
    this.element.querySelector('.film-details__comment-delete')
      .addEventListener('click', this.#deleteCommentHandler);
  }

  #deleteCommentHandler = () => {
    debugger;
    this.#hadleDeleteCommet(this.#comments);
  };

  get template() {
    return createPopupFilmCommentStructureTemplate(this.#commentId, this.#comments, this.#indexOfComment, this._state, this.#commentsData);
  }
}
