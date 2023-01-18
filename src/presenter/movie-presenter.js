import CardFilmsView from "../view/card-films-view";
import { render } from "../framework/render";

export default class MoviePresenter {
  #filmContainer = null;
  #openPopup = null;
  #movie = null;
  #movieCardComponent = null;
    constructor({filmContainer}) {
      this.#filmContainer = filmContainer;
    }

    init(movie) {
      this.movie = movie

      this.#movieCardComponent = new CardFilmsView({
      movie,
      onShowPopupClick: () => {
      this.#openPopup(movie);
        }
      });
      render(this.#movieCardComponent, this.#filmContainer);
    }
}

