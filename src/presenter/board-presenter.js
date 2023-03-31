import FilmListView from '../view/film-list-view.js';
import { remove, render } from '../framework/render';
import SortView from '../view/sort-view.js';
import ShowMoreButtonView from '../view/show-more-button-view.js';
import UserNameStatusView from '../view/user-name-status-view.js';
import FooterStatisticsView from '../view/footer-statistics-view.js';
import MoviePresenter from './movie-presenter.js';
import PopupPresenter from './popup-presenter.js';
import { SortType, UpdateType, UserAction } from '../const.js';
import {sortMovieDate, sortMovieRating, sortMovieDefault} from '../utils/date-transform';
import { filter } from '../utils/filter.js';
import LoadingView from '../view/loading-view.js';
import UiBlocker from '../framework/ui-blocker/ui-blocker.js';
import { PopupState } from '../const.js';
import { TimeLimit } from '../const.js';

export default class BoardPresenter {
  static MOVIE_COUNT_PER_STEP = 5;
  static MOVIE_COUNT_ZERO = 0;
  #header = null;
  #main = null;
  #footer = null;
  #movieModel = null;
  #body = null;
  #renderMovieCount = BoardPresenter.MOVIE_COUNT_PER_STEP;
  #moviePresenter = new Map();
  #filmListComponent = new FilmListView();
  #filmContainerElement = this.#filmListComponent.element.querySelector('.films-list__container');
  #loadMoreButtonComponent = null;
  #popupPresenterComponent = null;
  #sortComponent = null;
  #currentSortType = SortType.DEFAULT;
  #filterModel = null;
  #noMovieComponent = null;
  #filterType = null;
  #commentsModel = null;
  #loadingComponent = new LoadingView();
  #isLoading = true;
  #uiBLocker = new UiBlocker({
    LOWER_LIMIT:TimeLimit.LOWER_LIMIT,
    UPPER_LIMIT: TimeLimit.UPPER_LIMIT,
  });

  #popupState = PopupState.CLOSED;
  #loadMoreButtonHandler = () => {
    const movieCount = this.movie.length;
    this.movie
      .slice(this.#renderMovieCount, this.#renderMovieCount + BoardPresenter.MOVIE_COUNT_PER_STEP)
      .forEach((movie) => this.#renderMovie(movie));
    this.#renderMovieCount += BoardPresenter.MOVIE_COUNT_PER_STEP;
    if (this.#renderMovieCount >= movieCount) {
      remove(this.#loadMoreButtonComponent);
    }
  };

  constructor({header, main, footer, movieModel, body, filterModel, commentsModel}) {
    this.#header = header;
    this.#main = main;
    this.#footer = footer;
    this.#movieModel = movieModel;
    this.#body = body;
    this.#filterModel = filterModel;
    this.#commentsModel = commentsModel;
    this.#movieModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
    this.#commentsModel.addObserver(this.#handleModelEvent);
  }

  get movie() {
    this.#filterType = this.#filterModel.filter;
    const movie = this.#movieModel.movie;
    const filteredMovie = filter[this.#filterType](movie);
    switch (this.#currentSortType) {
      case SortType.DATE:
        return filteredMovie.sort(sortMovieDate);
      case SortType.RATING:
        return filteredMovie.sort(sortMovieRating);
    }
    return filteredMovie.sort(sortMovieDefault);
  }

  get comments() {
    return this.#commentsModel;
  }

  get filters() {
    return this.#filterModel.filters;
  }

  init() {
    this.#renderBoard();
  }

  #renderMovie(movie) {
    // debugger;
    // if (this.#sortComponent)
    // console.log(this.#sortComponent);

    const moviePresenter = new MoviePresenter({
      filmContainerElement: this.#filmContainerElement,
      onShowPopupClick: this.#openPopup,
      onDataChange: this.#handleViewAction,
    });
    moviePresenter.init(movie);
    this.#moviePresenter.set(movie.id, moviePresenter);
  }

  #handleViewAction = async (actionType, updateType, update) => {
    this.#uiBLocker.block();
    switch(actionType) {
      case UserAction.SORT_MOVIE:
        this.#movieModel.updateType(updateType, update);
        break;
      case UserAction.UPDATE_MOVIE:
        try {
          await this.#movieModel.updateMovie(updateType, update);
        } catch {
          this.#moviePresenter.get(update.id).setAbortingCardFilmInfo();
        }
        break;
      case UserAction.UPDATE_POPUP:
        try {
          await this.#movieModel.updateMovie(updateType, update);
        } catch {
          this.#popupPresenterComponent.setAbortingWatchProgress();
        }
        break;
      case UserAction.DELETE_COMMENT:
        this.#popupPresenterComponent.setDeletingComment(update.commentId);
        try {
          await this.#commentsModel.deleteComment(updateType, update);
          this.#movieModel.updateMovie(updateType, update.movie);
        } catch {
          this.#popupPresenterComponent.setAbortingDeletingComment(update.commentId);
        }
        break;
      case UserAction.ADD_COMMENT:
        this.#popupPresenterComponent.setSavingComment();
        try {
          await this.#commentsModel.addComment(updateType, update);
          this.#movieModel.updateMovie(updateType, update.movie);
        } catch {
          this.#popupPresenterComponent.setAbortingSavingComment();
        }
        break;
    }
    this.#uiBLocker.unblock();
  };

  #handleModelEvent = (updateType, data) => {
    switch(updateType) {
      case UpdateType.PATCH:
        this.#moviePresenter.get(data.id).init(data);
        break;
      case UpdateType.MINOR:
        this.#clearMovieList();
        this.#renderMovieList();
        if (this.#popupPresenterComponent) {
          this.#renderPopup({ movie: data });
        }
        break;
      case UpdateType.MAJOR:
        this.#clearMovieList();
        this.#renderMovieList(data);
        break;
      case UpdateType.COMMENT:
        this.#removeComment(data.comments);
        break;
      case UpdateType.INIT:
        this.#isLoading = false;
        remove(this.#loadingComponent);
        this.#renderMovieList(data);
        break;
    }
  };

  #removePopupPresenterComponent() {
    this.#popupPresenterComponent = null;
  }

  #openPopup = (movie) => {
    this.#body.classList.add('hide-overflow');
    this.#renderPopup({movie});
  };

  #removeComment(comment) {
    remove(comment);
  }

  #clearMovieList() {
    this.#moviePresenter.forEach((presenter) => presenter.destroy());
    this.#moviePresenter.clear();
    remove(this.#loadMoreButtonComponent);
    this.#renderShowMoreBtn();
    remove(this.#noMovieComponent);
  }

  #renderLoading() {
    render(this.#loadingComponent, this.#filmContainerElement);
  }

  #renderPopup(movie) {
    this.#popupState = 'OPENED';
    if (this.#popupPresenterComponent) {
      this.#popupPresenterComponent.destroy();
      this.#popupPresenterComponent = null;
    }
    const popupPresenter = new PopupPresenter({
      movie: this.#movieModel.movie,
      body: this.#body,
      removePopupPresenterComponent: () => { this.#removePopupPresenterComponent(); },
      onDataChange: this.#handleViewAction,
      commentsModel: this.#commentsModel,
      popupState: this.#popupState,
    });
    popupPresenter.init(movie);
    this.#popupPresenterComponent = popupPresenter;
  }

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }
    this.#currentSortType = sortType;
    this.#clearMovieList();
    this.#renderMovieList();
  };

  #renderSort() {
    this.#sortComponent = new SortView({
      onSortTypeChange: this.#handleSortTypeChange,
    });
    render(this.#sortComponent, this.#main);
  }

  #renderMovieList() {

    if (this.movie.length <= BoardPresenter.MOVIE_COUNT_PER_STEP) {
      remove(this.#loadMoreButtonComponent);
    }

    for (let i = 0; i < BoardPresenter.MOVIE_COUNT_PER_STEP ; i++) {

      if (i === this.movie.length) {
        return;
      }

      this.#renderMovie(this.movie[i]);
    }
    render(this.#sortComponent, this.#main);
  }

  #renderBoard() {
    render(new UserNameStatusView(), this.#header);
    this.#renderSort();
    render(this.#filmListComponent, this.#main);

    if (this.#isLoading) {
      this.#renderLoading();
    }
    this.#renderMovieList();
    this.#renderShowMoreBtn();
    render(new FooterStatisticsView(), this.#footer);
  }

  #renderShowMoreBtn() {
    this.#loadMoreButtonComponent = new ShowMoreButtonView({
      onShowMoreClick: this.#loadMoreButtonHandler
    });
    render(this.#loadMoreButtonComponent, this.#main);
  }
}
