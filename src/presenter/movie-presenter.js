import CardFilmsView from '../view/card-films-view';
import { remove, render, replace } from '../framework/render';
import { UpdateType, UserAction } from '../const';

export default class MoviePresenter {
  #filmContainer = null;
  #movie = null;

  #movieCardComponent = null;
  #onShowPopupClick = null;
  #onClosePopupClick = null;

  #handleDataChange = null;


  constructor({filmContainer, onDataChange, onShowPopupClick}) {
    this.#filmContainer = filmContainer;
    this.#onShowPopupClick = onShowPopupClick;


    this.#handleDataChange = onDataChange;


  }

  init(movie) {
    this.#movie = movie;

    const prevMovieCardComponent = this.#movieCardComponent;
    this.#movieCardComponent = new CardFilmsView({
      movie,
      onShowPopupClick: () => { this.#onShowPopupClick(movie); },
      onClosePopupClick: this.#onClosePopupClick,

      onWatchlistClick: () => { this.#hadleWatchlistClick(movie); },
      onAlreadyWatchedClick: () => { this.#handleAlreadyWatchedClick(movie); },
      onFavoriteClick: () => { this.#handleFavoriteClick(movie); },
    });

    if (prevMovieCardComponent === null) {
      render(this.#movieCardComponent, this.#filmContainer);
      return ;
    }

    if(this.#filmContainer.contains(prevMovieCardComponent.element)) {
      replace(this.#movieCardComponent, prevMovieCardComponent);
    }

  }

  #remove(component) {
    remove(component);
  }

  #hadleWatchlistClick = () => {
    this.#handleDataChange(
      UserAction.UPDATE_MOVIE,
      UpdateType.MINOR,
      {...this.#movie, userDetails: {...this.#movie.userDetails, watchlist: !this.#movie.userDetails.watchlist}});
  };

  #handleAlreadyWatchedClick = () => {
    this.#handleDataChange(
      UserAction.UPDATE_MOVIE,
      UpdateType.MINOR,
      {...this.#movie, userDetails: {...this.#movie.userDetails, alreadyWatched: !this.#movie.userDetails.alreadyWatched}});
  };

  #handleFavoriteClick = () => {
    this.#handleDataChange(
      UserAction.UPDATE_MOVIE,
      UpdateType.MINOR,
      {...this.#movie, userDetails: {...this.#movie.userDetails, favorite: !this.#movie.userDetails.favorite}});
  };

  destroy() {
    this.#movieCardComponent.element.remove();
  }
}

