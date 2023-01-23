import CardFilmsView from '../view/card-films-view';
import { render, replace } from '../framework/render';

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
    this.movie = movie;

    const prevMovieCardComponent = this.#movieCardComponent;
    this.#movieCardComponent = new CardFilmsView({
      movie,
      onShowPopupClick: this.#onShowPopupClick,
      onClosePopupClick: this.#onClosePopupClick

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
    this.#handleDataChange({...this.#movie, isWatchlist: !this.#movie.isWatchlist});
  }

}

