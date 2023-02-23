import { humanizeCommentDate } from '../utils/date-transform.js';
import AbstractView from '../framework/view/abstract-view.js';

function createPopupFilmCommentStructureTemplate(commentId, comments, index) {
  return `<li class="film-details__comment">
  <span class="film-details__comment-emoji">
    <img src="./images/emoji/${comments[index].emotion}.png" width="55" height="55" alt="emoji-${comments[index].emotion}.png">
  </span>
  <div>
    <p class="film-details__comment-text">${comments[index].comment}</p>
    <p class="film-details__comment-info">
      <span class="film-details__comment-author">${comments[index].author}</span>
      <span class="film-details__comment-day">${humanizeCommentDate(comments[index].date)}</span>
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
  #index = null;
  constructor(commentId, index, {hadleDeleteCommet, comments, commentsModel}) {
    super();
    this.#index = index;
    this.#commentId = commentId;
    this.#commentsModel = commentsModel;
    this.#hadleDeleteCommet = hadleDeleteCommet;
    this.#comments = comments;
    this.element.querySelector('.film-details__comment-delete')
      .addEventListener('click', this.#daleteCommentHandler);
  }

  get template() {
    return createPopupFilmCommentStructureTemplate(this.#commentId, this.#comments, this.#index);
  }

  #daleteCommentHandler = () => {
    this.#hadleDeleteCommet(this.#commentId);
  };

}
