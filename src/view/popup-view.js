import { humanizeMovieDuration } from '../utils/date-transform.js';
import { humanizeReleaseDate } from '../utils/date-transform.js';
import PopupFilmCommentStructureView from './popup-film-comment-structure-view';
import PopupFilmDetailNewCommentView from './popup-film-details-new-comment-view';
import PopupFilmDetailsControlView from './popup-film-details-controls-view';
import { render } from '../framework/render.js';
import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';

function createPopupTemplate(movie) {
  const {comments, filmInfo} = movie;

  return `<section class="film-details">
  <div class="film-details__inner">
    <div class="film-details__top-container">
      <div class="film-details__close">
        <button class="film-details__close-btn" type="button">close</button>
      </div>
      <div class="film-details__info-wrap">
        <div class="film-details__poster">
          <img class="film-details__poster-img" src="${filmInfo.poster}" alt="">

          <p class="film-details__age">${filmInfo.ageRating}+</p>
        </div>

        <div class="film-details__info">
          <div class="film-details__info-head">
            <div class="film-details__title-wrap">
              <h3 class="film-details__title">${filmInfo.title}</h3>
              <p class="film-details__title-original">Original: ${filmInfo.alternativeTitle}</p>
            </div>

            <div class="film-details__rating">
              <p class="film-details__total-rating">${filmInfo.totalRating}</p>
            </div>
          </div>

          <table class="film-details__table">
            <tr class="film-details__row">
              <td class="film-details__term">Director</td>
              <td class="film-details__cell">${filmInfo.director}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Writers</td>
              <td class="film-details__cell">${filmInfo.writers}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Actors</td>
              <td class="film-details__cell">${filmInfo.actors}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Release Date</td>
              <td class="film-details__cell">${humanizeReleaseDate(filmInfo.release.date)}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Duration</td>
              <td class="film-details__cell">${humanizeMovieDuration(filmInfo.duration)}m</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Country</td>
              <td class="film-details__cell">USA</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Genres</td>
              <td class="film-details__cell">
                <span class="film-details__genre">Drama</span>
                <span class="film-details__genre">Film-Noir</span>
                <span class="film-details__genre">Mystery</span></td>
            </tr>
          </table>

          <p class="film-details__film-description">
            ${filmInfo.description}
          </p>
        </div>
      </div>

      <section class="film-details__controls-wrap"></section>
    </div>

    <div class="film-details__bottom-container">
      <section class="film-details__comments-wrap">
      <h3 class="film-details__comments-title">Comments ${comments.length}</h3>

        <ul class="film-details__comments-list">
        </ul>
      </section>
    </div>
  </div>
</section>`;
}

export default class PopupView extends AbstractStatefulView {
  #handleClosePopupClick = null;
  #movie = null;
  #commentList = null;
  #hadleWatchlistClick = null;
  #handleAlreadyWatchedClick = null;
  #handleFavoriteClick = null;
  #popupFilmDetailNewCommentView = null;
  #popupFilmCommentStructureView = null;
  #handleDeleteComment = null;
  #commentsModel = null;
  #comments = null;
  #hanleComment = null;
  #onAddCommentHandler = null;

  #scrollPosition = null;

  #filmDetailsControl = null;

  #popupCommentsView = new Map();

  #popupFilmDetailsControlView = null;

  #popupFilmDetailsControlSection = null;

  constructor({scrollPosition, movie, onAddCommentHandler, onClosePopupClick, onWatchlistPopupClick, onAlreadyWatchedClick, onFavoriteClick, onCloseComment, commentsModel, comments}) {
    super();
    this.#movie = movie.movie;
    this.#hadleWatchlistClick = onWatchlistPopupClick ;
    this.#handleAlreadyWatchedClick = onAlreadyWatchedClick;
    this.#handleFavoriteClick = onFavoriteClick;
    this.#popupFilmDetailNewCommentView = new PopupFilmDetailNewCommentView({
      hanleComment: this.#commentAddHandler,
    });
    // this.#scrollPosition = 
    // scrollPosition: this.#scrollPosition;
    

    this.#popupFilmDetailsControlSection = this.element.querySelector('.film-details__controls-wrap');
    this.#popupFilmDetailsControlView = new PopupFilmDetailsControlView({
      movie: this.#movie,
      onWatchlistPopupClick: this.#addToWatchlistPopupClickHandler,
      onAlreadyWatchedClick: this.#alreadyWatchedClickHandler,
      onFavoriteClick: this.#favoriteClickHandler,
    });
    render(this.#popupFilmDetailsControlView, this.#popupFilmDetailsControlSection);

    this.#scrollPosition = scrollPosition;
    this.#onAddCommentHandler = onAddCommentHandler;
    this.#handleClosePopupClick = onClosePopupClick;
    this.#handleDeleteComment = onCloseComment;
    this.#commentsModel = commentsModel;
    this.#comments = comments;
    this.#commentList = this.element.querySelector('.film-details__comments-list');
    this.element.querySelector('.film-details__close-btn')
      .addEventListener('click', this.#closePopupClickHandler);

    this.#filmDetailsControl = this.element.querySelector('.film-details__controls');

    this.#movie.comments.forEach((commentId, indexOfComment) => {
      const popupFilmCommentStructureView = new PopupFilmCommentStructureView(
        commentId,
        indexOfComment,
        {
          hadleDeleteCommet: this.#deleteCommentHandler,
          comments: this.#comments[indexOfComment],
          commentsModel: this.#commentsModel,
        });

      this.#popupCommentsView.set(commentId, popupFilmCommentStructureView);

      render(popupFilmCommentStructureView, this.#commentList);
      this.#popupFilmCommentStructureView = popupFilmCommentStructureView;
    });
    render(this.#popupFilmDetailNewCommentView, this.#commentList);
  }

  get template() {
    return createPopupTemplate(this.#movie);
  }

  #commentAddHandler = (comment) => {
    debugger;
    const scroll = this.element.scrollTop;
    this.#scrollPosition(scroll);
    this.#onAddCommentHandler(comment);
  };

  #deleteCommentHandler = (commentId) => {
    this.#handleDeleteComment(commentId);
  };

  #closePopupClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleClosePopupClick();
  };

  #addToWatchlistPopupClickHandler = () => {
    this.#hadleWatchlistClick();

    console.log(this.element.scrollTop);
  };

  #alreadyWatchedClickHandler = () => {
    this.#handleAlreadyWatchedClick();
    console.log(this.element.scrollTop);
  };

  #favoriteClickHandler = () => {
    this.#handleFavoriteClick();
    console.log(this.element.scrollTop);
  };

  resetpopupFilmDetailNewCommentView() {
    this.#popupFilmDetailNewCommentView.reset();
  }

  setSavingComment() {
    this.#popupFilmDetailNewCommentView.updateElement({
      isDisabled: true,
    });
    // console.log(this.element.scrollTop);
  }

  setDeletingComment(commentId) {
    debugger;
    this.#popupCommentsView.get(commentId.id).updateElement({
      isDeleting: true,
      isDisabled: true,
      scrollPosition: this.element.scrollTop,
    });
    // console.log(this.element.scrollTop);
  }

  setAbortingDeletingComment = (commentId) => {
    this.#popupCommentsView.get(commentId.id).updateElement({
      isDeleting: false,
      isDisabled: false,
    });
    this.#popupCommentsView.get(commentId.id).shake();
  };

  setAbortingSavingComment = () => {
    this.#popupFilmDetailNewCommentView.updateElement({
      isDisabled: false,
    });
    this.#popupFilmDetailNewCommentView.shake();
  };

  setAbortingWatchProgress = () => {
    this.#popupFilmDetailsControlView.shake();
  };
}
