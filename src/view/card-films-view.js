import { humanizeMovieDueDate } from '../utils/date-transform.js';
import { humanizeMovieDuration } from '../utils/date-transform.js';
import AbstractView from '../framework/view/abstract-view.js';
function createCardFilmsTemplate(movie) {
  const {filmInfo, comments} = movie;
  const commentsLength = comments.length;
  return `<article class="film-card">
  <a class="film-card__link">
    <h3 class="film-card__title">${filmInfo.title}</h3>
    <p class="film-card__rating">${filmInfo.totalRating}</p>
    <p class="film-card__info">
      <span class="film-card__year">${humanizeMovieDueDate(filmInfo.release.date)}</span>
      <span class="film-card__duration">${humanizeMovieDuration(filmInfo.duration)}m</span>
      <span class="film-card__genre">${filmInfo.genre}</span>
    </p>
    <img src="./images/posters/${filmInfo.poster}" alt="" class="film-card__poster">
    <p class="film-card__description">${filmInfo.description}</p>
    <span class="film-card__comments">${commentsLength} comments</span>
  </a>
  <div class="film-card__controls">
    <button class="film-card__controls-item film-card__controls-item--add-to-watchlist film-card__controls-item--active" type="button">Add to watchlist</button>
    <button class="film-card__controls-item film-card__controls-item--mark-as-watched" type="button">Mark as watched</button>
    <button class="film-card__controls-item film-card__controls-item--favorite" type="button">Mark as favorite</button>
  </div>
</article>`;
}

export default class CardFilmsView extends AbstractView {
  #handleShowPopupClick = null;
  #movie = null;
  #showPopupClickHandler = null;

  #hadleWatchlistClick = null;
  #handleAlreadyWatchedClick = null;
  #handleFavoriteClick = null;

  #addToWatchlistBtn = null;
  #watchedBtn = null;
  #favoriteBtn = null;


  constructor({movie, onShowPopupClick, onWatchlistClick, onFavoriteClick, onAlreadyWatchedClick}) {
    super();
    this.#movie = movie;

    this.#hadleWatchlistClick = onWatchlistClick ;
    this.#handleAlreadyWatchedClick = onAlreadyWatchedClick;
    this.#handleFavoriteClick = onFavoriteClick;


    this.#showPopupClickHandler = () => {
      this.#handleShowPopupClick();
    };

    this.element.querySelector('.film-card__link')
      .addEventListener('click', this.#showPopupClickHandler);
    this.#handleShowPopupClick = onShowPopupClick;

    this.element.querySelector('.film-card__controls-item--add-to-watchlist')
      .addEventListener('click', this.#addToWatchlistClickHandler);

    this.element.querySelector('.film-card__controls-item--mark-as-watched')
      .addEventListener('click', this.#alreadyWatchedClickHandler);


    this.element.querySelector('.film-card__controls-item--favorite')
      .addEventListener('click', this.#favoriteClickHandler);
  }

  get template() {
    return createCardFilmsTemplate(this.#movie);
  }

  #addToWatchlistClickHandler = () => {
    this.#hadleWatchlistClick();
    this.#addToWatchlistBtn = this.element.querySelector('.film-card__controls-item--add-to-watchlist');
    if (this.#addToWatchlistBtn.classList.contains('film-card__controls-item--active')) {
      return this.#addToWatchlistBtn.classList.remove('film-card__controls-item--active');
    }
    return this.#addToWatchlistBtn.classList.add('film-card__controls-item--active');
  };

  #alreadyWatchedClickHandler = () => {
    this.#handleAlreadyWatchedClick();
    this.#watchedBtn = this.element.querySelector('.film-card__controls-item--mark-as-watched');
    if (this.#watchedBtn.classList.contains('film-card__controls-item--active')) {
      return this.#watchedBtn.classList.remove('film-card__controls-item--active');
    }
    return this.#watchedBtn.classList.add('film-card__controls-item--active');
  };


  #favoriteClickHandler = () => {
    this.#handleFavoriteClick();
    this.#favoriteBtn = this.element.querySelector('.film-card__controls-item--favorite');
    if (this.#favoriteBtn.classList.contains('film-card__controls-item--active')) {
      return this.#favoriteBtn.classList.remove('film-card__controls-item--active');
    }
    return this.#favoriteBtn.classList.add('film-card__controls-item--active');
  };
}


