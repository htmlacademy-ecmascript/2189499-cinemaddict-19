import CardFilmsView from '../view/card-films-view';
import { remove, render, replace } from '../framework/render';

export default class MoviePresenter {
  #filmContainer = null;
  #movie = null;

  #movieCardComponent = null;
  #onShowPopupClick = null;
  #onClosePopupClick = null;

  #handleDataChange = null;


  constructor({filmContainer, onShowPopupClick, onClosePopupClick, onDataChange}) {
    this.#filmContainer = filmContainer;
    this.#onShowPopupClick = onShowPopupClick;
    this.#onClosePopupClick = onClosePopupClick;

    this.#handleDataChange = onDataChange;


  }

  init(movie) {
    this.#movie = movie;

    const prevMovieCardComponent = this.#movieCardComponent;
    this.#movieCardComponent = new CardFilmsView({
      movie,
      onShowPopupClick: this.#onShowPopupClick,
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

    // this.#remove(prevMovieCardComponent);
    // render(this.#movieCardComponent, this.#filmContainer);
  }

  #remove(component) {
    remove(component);
  }

  #hadleWatchlistClick = () => {
    this.#handleDataChange({...this.#movie, userDetails: {...this.#movie.userDetails, watchlist: !this.#movie.userDetails.watchlist}});
  };

  #handleAlreadyWatchedClick = () => {
    this.#handleDataChange({...this.#movie, userDetails: {...this.#movie.userDetails, alreadyWatched: !this.#movie.userDetails.alreadyWatched}});
  };

  #handleFavoriteClick = () => {
    this.#handleDataChange({...this.#movie, userDetails: {...this.#movie.userDetails, favorite: !this.#movie.userDetails.favorite}});
  };
}

