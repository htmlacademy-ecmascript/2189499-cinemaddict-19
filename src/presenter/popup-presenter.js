import { remove, render } from '../framework/render';
import PopupView from '../view/popup-view';

export default class PopupPresenter {
  #onClosePopupClick = null;
  #popupViewComponent = null;
  #handleDataChange = null;
  #body = null;
  #movie = null;

  constructor({body, onDataChange}) {
    this.#body = body;

    this.#handleDataChange = onDataChange;
  }

  init(movie) {
    this.#movie = movie.movie;
    this.#popupViewComponent = new PopupView({
      movie,
      onClosePopupClick: this.#handleClosePopupClick,

      onWatchlistPopupClick: () => { this.#hadleWatchlistClick(movie); },
      onAlreadyWatchedClick: () => { this.#handleAlreadyWatchedClick(movie); },
      onFavoriteClick: () => { this.#handleFavoriteClick(movie); },
    });
    render(this.#popupViewComponent, this.#body);
    this.#closeEscBtnPopup();
  }

  #handleClosePopupClick = () => {
    debugger;
    remove(this.#popupViewComponent);
    this.#popupViewComponent.resetpopupFilmDetailNewCommentView();
    this.#body.classList.remove('hide-overflow');
  };

  #closeEscBtnPopup = () => {
    const escKeydownHandler = (evt) => {

      if(evt.key === 'Escape' || evt.key === 'Esc') {
        evt.preventDefault();
        this.#handleClosePopupClick();
        document.removeEventListener('keydown', escKeydownHandler);
      }
    };

    document.addEventListener('keydown', escKeydownHandler);
  };

  #hadleWatchlistClick = () => {
    this.#handleDataChange({...this.#movie, userDetails: {...this.#movie.userDetails, watchlist: !this.#movie.userDetails.watchlist}});
  };

  #handleAlreadyWatchedClick = () => {
    this.#handleDataChange({...this.#movie, userDetails: {...this.#movie.userDetails, alreadyWatched: !this.#movie.userDetails.alreadyWatched}});
  };

  #handleFavoriteClick = () => {
    this.#handleDataChange({...this.#movie, userDetails: {...this.#movie.userDetails, favorite: !this.#movie.userDetails.favorite}});
  };

  destroy() {
    this.#popupViewComponent.element.remove();
  }
}
