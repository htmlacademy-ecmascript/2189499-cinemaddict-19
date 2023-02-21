import { remove, render } from '../framework/render';
import PopupView from '../view/popup-view';
import { UserAction,UpdateType } from '../const';
export default class PopupPresenter {
  #onClosePopupClick = null;
  #popupViewComponent = null;
  #handleDataChange = null;
  #body = null;
  #movie = null;
  #removePopupPresenterComponentHandler = null;
  #commentsModel = null;
  constructor({body, onDataChange, removePopupPresenterComponent, commentsModel}) {
    this.#body = body;
    this.#removePopupPresenterComponentHandler = removePopupPresenterComponent;
    this.#handleDataChange = onDataChange;
    this.#commentsModel = commentsModel;
  }

  init(movie) {
    this.#movie = movie.movie;
    this.#popupViewComponent = new PopupView({
      movie,
      onClosePopupClick: this.#handleClosePopupClick,
      onWatchlistPopupClick: () => { this.#hadleWatchlistClick(movie); },
      onAlreadyWatchedClick: () => { this.#handleAlreadyWatchedClick(movie); },
      onFavoriteClick: () => { this.#handleFavoriteClick(movie); },
      onCloseComment: this.#closeCommentHandle,
      commentsModel: this.#commentsModel,
    });
    render(this.#popupViewComponent, this.#body);
    this.#closeEscBtnPopup();
  }

  #handleClosePopupClick = () => {
    remove(this.#popupViewComponent);
    this.#removePopupPresenterComponentHandler();
    this.#body.classList.remove('hide-overflow');
  };

  #closeEscBtnPopup = () => {
    const escKeydownHandler = (evt) => {
      if (evt.key === 'Escape' || evt.key === 'Esc') {
        evt.preventDefault();
        this.#handleClosePopupClick();
        document.removeEventListener('keydown', escKeydownHandler);
      }
    };
    document.addEventListener('keydown', escKeydownHandler);
  };

  #closeCommentHandle = (commentId) => {
    const movie = {
      ...this.#movie,
      comments: this.#movie.comments.filter((value) =>value !== Number(commentId)),
    };
    this.#handleDataChange(
      UserAction.UPDATE_POPUP,
      UpdateType.MINOR,
      movie
    );
  };

  #hadleWatchlistClick = () => {
    this.#handleDataChange(
      UserAction.UPDATE_POPUP,
      UpdateType.MINOR,
      {...this.#movie, userDetails: {...this.#movie.userDetails, watchlist: !this.#movie.userDetails.watchlist}});
  };

  #handleAlreadyWatchedClick = () => {
    this.#handleDataChange(
      UserAction.UPDATE_POPUP,
      UpdateType.MINOR,
      {...this.#movie, userDetails: {...this.#movie.userDetails, alreadyWatched: !this.#movie.userDetails.alreadyWatched}});
  };

  #handleFavoriteClick = () => {
    this.#handleDataChange(
      UserAction.UPDATE_POPUP,
      UpdateType.MINOR,
      {...this.#movie, userDetails: {...this.#movie.userDetails, favorite: !this.#movie.userDetails.favorite}});
  };

  destroy() {
    this.#popupViewComponent.element.remove();
  }
}
