import { remove, render } from '../framework/render';
import PopupView from '../view/popup-view';
import { UserAction,UpdateType } from '../const';

export default class PopupPresenter {
  #onClosePopupClick = null;
  #popupViewComponent = null;
  #handleDataChange = null;
  #body = null;
  #movie = null;
  #comments = null;
  #removePopupPresenterComponentHandler = null;
  #commentsModel = null;
  #popupState = null;
  #scrollPosition = null;


  constructor({body, onDataChange, removePopupPresenterComponent, commentsModel, popupState}) {
    this.#body = body;
    this.#removePopupPresenterComponentHandler = removePopupPresenterComponent;
    this.#handleDataChange = onDataChange;
    this.#commentsModel = commentsModel;
    this.#popupState = popupState;
  }

  async init(movie) {
    this.#movie = movie.movie;
    await this.#commentsModel.init(movie.movie);
    this.#comments = this.#commentsModel.comments;
    this.#popupViewComponent = new PopupView({
      movie,
      comments: this.#comments,
      onClosePopupClick: this.#handleClosePopupClick,
      onWatchlistPopupClick: () => { this.#hadleWatchlistClick(movie); },
      onAlreadyWatchedClick: () => { this.#handleAlreadyWatchedClick(movie); },
      onFavoriteClick: () => { this.#handleFavoriteClick(movie); },
      onCloseComment: this.#closeCommentHandle,
      onAddCommentHandler: this.#handleCommentAdd,
      scrollPosition: this.#scrollPosition,
    });
    render(this.#popupViewComponent, this.#body);
    this.#closeEscBtnPopup();
    console.log(this.#scrollPosition);
    //вот тут происходит прокурутка к нашей позиции
    this.#popupViewComponent.element.scrollBy(0, 200);
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

  #handleCommentAdd = (commentAdd) => {
    const movie = this.#movie.id;
    this.#handleDataChange(
      UserAction.ADD_COMMENT,
      UpdateType.MINOR,
      {commentAdd, movie},
    );
    // console.log(this.element)
    // this.#scrollPosition = 
  };

  #closeCommentHandle = async (commentId) => {
    const movie = {
      ...this.#movie,
      comments: this.#movie.comments.filter((value) =>value !== Number(commentId.id)),
    };

    this.#handleDataChange(
      UserAction.DELETE_COMMENT,
      UpdateType.MINOR,
      {commentId, movie}
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

  setSavingComment() {
    this.#popupViewComponent.setSavingComment();
  }

  setDeletingComment(commentId) {
    this.#popupViewComponent.setDeletingComment(commentId);

  }

  setAbortingDeletingComment(commentId) {
    this.#popupViewComponent.setAbortingDeletingComment(commentId);
  }

  setAbortingSavingComment() {
    this.#popupViewComponent.setAbortingSavingComment();
  }

  setAbortingWatchProgress() {
    this.#popupViewComponent.setAbortingWatchProgress(this.#popupViewComponent);
  }
}
