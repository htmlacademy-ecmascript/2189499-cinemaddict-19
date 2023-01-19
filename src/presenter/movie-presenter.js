import CardFilmsView from '../view/card-films-view';
import { render } from '../framework/render';

export default class MoviePresenter {
  #filmContainer = null;
  #movie = null;
  #movieCardComponent = null;
  #onShowPopupClick = null;
  #onClosePopupClick = null;
  constructor({filmContainer, onShowPopupClick, onClosePopupClick}) {
    this.#filmContainer = filmContainer;
    this.#onShowPopupClick = onShowPopupClick;
    this.#onClosePopupClick = onClosePopupClick;
  }

  init(movie) {
    this.movie = movie;

    this.#movieCardComponent = new CardFilmsView({
      movie,
      onShowPopupClick: this.#onShowPopupClick,
      onClosePopupClick: this.#onClosePopupClick

    });
    render(this.#movieCardComponent, this.#filmContainer);
  }


}

