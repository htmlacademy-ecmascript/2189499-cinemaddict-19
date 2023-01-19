import CardFilmsView from '../view/card-films-view';
import { render } from '../framework/render';

export default class MoviePresenter {
  #filmContainer = null;
  #movie = null;
  #movieCardComponent = null;
  #onShowPopupClick = null;
  constructor({filmContainer, onShowPopupClick}) {
    this.#filmContainer = filmContainer;
    this.#onShowPopupClick = onShowPopupClick;
  }

  init(movie) {
    this.movie = movie;

    this.#movieCardComponent = new CardFilmsView({
      movie,
      onShowPopupClick: this.#onShowPopupClick


    });
    render(this.#movieCardComponent, this.#filmContainer);
  }


}

