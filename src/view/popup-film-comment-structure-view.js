
import { mockComments } from '../mock/movies.js';
import { humanizeCommentDate } from '../utils/date-transform.js';
import AbstractView from '../framework/view/abstract-view.js';

function createPopupFilmCommentStructureTemplate(commentId, comments) {
  console.log(commentId, comments);
  return `<li class="film-details__comment">
  <span class="film-details__comment-emoji">
    <img src="./images/emoji/" width="55" height="55" alt="emoji-">
  </span>
  <div>
    <p class="film-details__comment-text"></p>
    <p class="film-details__comment-info">
      <span class="film-details__comment-author"></span>
      <span class="film-details__comment-day"></span>
      <button class="film-details__comment-delete">Delete</button>
    </p>
  </div>
</li>`;
}

export default class PopupFilmCommentStructureView extends AbstractView {
  #commentId = null;
  #hadleDeleteCommet = null;
  #commentsModel = null;
  #comments = null;
  constructor(commentId, {hadleDeleteCommet, comments, commentsModel}) {
    debugger;
    super();
    this.#commentId = commentId;
    this.#commentsModel = commentsModel;
    this.#hadleDeleteCommet = hadleDeleteCommet;
    this.#comments = comments;
    this.element.querySelector('.film-details__comment-delete')
      .addEventListener('click', this.#daleteCommentHandler);
  }

  get template() {
    return createPopupFilmCommentStructureTemplate(this.#commentId, this.#comments.comments);
  }

  #daleteCommentHandler = () => {
    this.#hadleDeleteCommet(this.#commentId);
  };

}
