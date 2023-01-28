import { humanizeMovieDuration } from '../utils/date-transform.js';
import { humanizeReleaseDate } from '../utils/date-transform.js';
import AbstractView from '../framework/view/abstract-view.js';
function createPopupTemplate(movie) {
  const {movie: {filmInfo, userDetails: {watchlist, alreadyWatched, favorite}}} = movie;

  const isActiveWatchlist = watchlist
  ? 'film-details__control-button--active'
  : '';

const isActiveAlreadyWatched = alreadyWatched
  ? 'film-details__control-button--active'
  : '';

const isActiveFavorite = favorite
  ? 'film-details__control-button--active'
  : '';

  return `<section class="film-details">
  <div class="film-details__inner">
    <div class="film-details__top-container">
      <div class="film-details__close">
        <button class="film-details__close-btn" type="button">close</button>
      </div>
      <div class="film-details__info-wrap">
        <div class="film-details__poster">
          <img class="film-details__poster-img" src="./images/posters/${filmInfo.poster}" alt="">

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
              <td class="film-details__cell">${humanizeMovieDuration(filmInfo.duration)}</td>
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

      <section class="film-details__controls">
        <button type="button" class="film-details__control-button ${isActiveWatchlist} film-details__control-button--watchlist" id="watchlist" name="watchlist">Add to watchlist</button>
        <button type="button" class="film-details__control-button ${isActiveAlreadyWatched} film-details__control-button--watched" id="watched" name="watched">Already watched</button>
        <button type="button" class="film-details__control-button ${isActiveFavorite} film-details__control-button--favorite" id="favorite" name="favorite">Add to favorites</button>
      </section>
    </div>

    <div class="film-details__bottom-container">
      <section class="film-details__comments-wrap">
      <h3 class="film-details__comments-title">Comments </h3>

        <ul class="film-details__comments-list">
        </ul>
      </section>
    </div>
  </div>
</section>`;
}

export default class PopupView extends AbstractView {
  #handleClosePopupClick = null;
  #movie = null;
  constructor({movie, onClosePopupClick}) {
    super();
    this.#movie = movie;
    this.#handleClosePopupClick = onClosePopupClick;
    this.element.querySelector('.film-details__close-btn')
      .addEventListener('click', this.#closePopupClickHandler);

    this.element.querySelector('.film-details__control-button--watchlist')
      .addEventListener('click', this.#addToWatchlistClickHandler);

    this.element.querySelector('.film-details__control-button--watched')
      .addEventListener('click', this.#alreadyWatchedClickHandler);
    
    this.element.querySelector('.film-details__control-button--favorite')
      .addEventListener('click', this.#favoriteClickHandler);
  }

  get template() {
    return createPopupTemplate(this.#movie);
  }

  #closePopupClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleClosePopupClick();
  };
  
  #addToWatchlistClickHandler() {
    console.log('some push');
  }

  #alreadyWatchedClickHandler() {
    console.log('some push 1')
  }

  #favoriteClickHandler = () => {
    console.log('some Push 2')
  };
}

