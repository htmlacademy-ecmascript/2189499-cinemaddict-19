import CardFilmsView from "../view/card-films-view";
import { render } from "../framework/render";

export default class MoviePresenter {
  #filmContainer = null;
  // #openPopup = null;
  #movie = null;
  #movieCardComponent = null;
  #openPopup = null;
  #onShowPopupClick = null;
    constructor({filmContainer, onShowPopupClick, openPopup}) {
      this.#filmContainer = filmContainer;
      this.#openPopup = openPopup;
      this.#onShowPopupClick = onShowPopupClick;
    }

    init(movie) {
      this.movie = movie

      this.#movieCardComponent = new CardFilmsView({
      movie,
      onShowPopupClick: (movie) => {
        this.#openPopup(movie);
          }

      });
      render(this.#movieCardComponent, this.#filmContainer);
    }
    



    }

