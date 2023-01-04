import AbstractView from '../framework/view/abstract-view.js';

function createPopupFilmDetailsCommentsTitleTemplate(commentsCount) {
  return `<span class="film-details__comments-count">${commentsCount.movie.comments.length}</span>`;
}

export default class PopupFilmDetailsCommentsTitleView extends AbstractView {
  #commentsCount = null;

  constructor(commentsCount) {
    super();
    this.#commentsCount = commentsCount;
  }

  get template() {
    return createPopupFilmDetailsCommentsTitleTemplate(this.#commentsCount);
  }

}
