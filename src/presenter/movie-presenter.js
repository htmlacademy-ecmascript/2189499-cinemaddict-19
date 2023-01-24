import CardFilmsView from '../view/card-films-view';
import { render, replace } from '../framework/render';

export default class MoviePresenter {
  #filmContainer = null;
  #movie = null;
  #movieCardComponent = null;
  #onShowPopupClick = null;
  #onClosePopupClick = null;

  #handleDataChangeWatchlist = null;
  #handleDataChangeAlreadyWatched = null;
  #handleDataChangeFavorite = null;


  constructor({filmContainer, onShowPopupClick, onClosePopupClick, onDataChangeWatchlist, onDataChangeAlreadyWatchedClick, onDataChangeFavoriteClick}) {
    this.#filmContainer = filmContainer;
    this.#onShowPopupClick = onShowPopupClick;
    this.#onClosePopupClick = onClosePopupClick;

    this.#handleDataChangeWatchlist = onDataChangeWatchlist;
    this.#handleDataChangeAlreadyWatched = onDataChangeAlreadyWatchedClick;
    this.#handleDataChangeFavorite = onDataChangeFavoriteClick;

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

    if(this.#movieCardComponent.contsains(prevMovieCardComponent.element)) {
      replace(this.#movieCardComponent, prevMovieCardComponent);
    }
    render(this.#movieCardComponent, this.#filmContainer);
  }

  #hadleWatchlistClick = () => {
    this.#handleDataChangeWatchlist({...this.#movie, userDetails: {...this.#movie.userDetails, watchlist: this.#movie.userDetails.watchlist}});
  };

  #handleAlreadyWatchedClick = () => {
    this.#handleDataChangeAlreadyWatched({...this.#movie, userDetails: {...this.#movie.userDetails, alreadyWatched: this.#movie.userDetails.alreadyWatched}});
  };

  #handleFavoriteClick = () => {
    this.#handleDataChangeFavorite({...this.#movie, userDetails: {...this.#movie.userDetails, favorite: this.#movie.userDetails.favorite}});
  };
}

