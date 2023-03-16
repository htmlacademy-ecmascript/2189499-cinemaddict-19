import AbstractStatefulView from '../framework/view/abstract-stateful-view';

function createPopupFilmDetailsControlViewTemplate(movie) {
  debugger;
  const {userDetails: {watchlist, alreadyWatched, favorite}} = movie;

  const isActiveWatchlist = watchlist
    ? 'film-details__control-button--active'
    : '';

  const isActiveAlreadyWatched = alreadyWatched
    ? 'film-details__control-button--active'
    : '';

  const isActiveFavorite = favorite
    ? 'film-details__control-button--active'
    : '';


  return (`
  <section class="film-details__controls">
  <button type="button" class="film-details__control-button ${isActiveWatchlist} film-details__control-button--watchlist" id="watchlist" name="watchlist">Add to watchlist</button>
  <button type="button" class="film-details__control-button ${isActiveAlreadyWatched} film-details__control-button--watched" id="watched" name="watched">Already watched</button>
  <button type="button" class="film-details__control-button ${isActiveFavorite} film-details__control-button--favorite" id="favorite" name="favorite">Add to favorites</button>
  </section>
  `);
}

export default class PopupFilmDetailsControlView extends AbstractStatefulView {
  #movie = null;
  // #hadleWatchlistClick = null;
  // #handleAlreadyWatchedClick = null;
  // #handleFavoriteClick = null;

  #hadleWatchlistClick = null;
  #handleAlreadyWatchedClick = null;
  #handleFavoriteClick = null;
  constructor({movie, onWatchlistPopupClick, onAlreadyWatchedClick, onFavoriteClick}) {
    super();
    this.#movie = movie;

    this.#hadleWatchlistClick = onWatchlistPopupClick ;
    this.#handleAlreadyWatchedClick = onAlreadyWatchedClick;
    this.#handleFavoriteClick = onFavoriteClick;

    // this.element.querySelector('.film-details__control-button--watchlist')
    //   .addEventListener('click', this.#addToWatchlistPopupClickHandler);

    // this.element.querySelector('.film-details__control-button--watched')
    //   .addEventListener('click', this.#alreadyWatchedClickHandler);

    // this.element.querySelector('.film-details__control-button--favorite')
    //   .addEventListener('click', this.#favoriteClickHandler);
  }

  get template() {
    return createPopupFilmDetailsControlViewTemplate(this.#movie);
  }

  #addToWatchlistPopupClickHandler = () => {
    this.#hadleWatchlistClick();
  };

  #alreadyWatchedClickHandler = () => {
    this.#handleAlreadyWatchedClick();
  };

  #favoriteClickHandler = () => {
    this.#handleFavoriteClick();
  };

}

