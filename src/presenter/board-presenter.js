import FilmListView from '../view/film-list-view.js';
import MenuView from '../view/menu-view.js';
import { remove, render } from '../framework/render';
import SortView from '../view/sort-view.js';
import ShowMoreButtonView from '../view/show-more-button-view.js';
import UserNameStatusView from '../view/user-name-status-view.js';
import FooterStatisticsView from '../view/footer-statistics-view.js';
import NoMovieView from '../view/no-moviecard-view.js';
import { generateFilter } from '../mock/filters.js';
import MoviePresenter from './movie-presenter.js';
import PopupPresenter from './popup-presenter.js';
import { SortType } from '../const.js';
import {sortMovieDate, sortMovieRating} from '../utils/date-transform';

export default class BoardPresenter {
  static MOVIE_COUNT_PER_STEP = 5;
  #header = null;
  #main = null;
  #footer = null;
  #movieModel = null;
  #body = null;
  #renderMovieCount = BoardPresenter.MOVIE_COUNT_PER_STEP;
  #popupView = null;
  #moviePresenter = new Map();


  #loadMoreButtonHandler = () => {
    const movieCount = this.movie.length;

    this.movie
      .slice(this.#renderMovieCount, this.#renderMovieCount + BoardPresenter.MOVIE_COUNT_PER_STEP)
      .forEach((movie) => this.#renderMovie(movie));

    this.#renderMovieCount += BoardPresenter.MOVIE_COUNT_PER_STEP;

    if (this.#renderMovieCount >= movieCount){
      remove(this.#loadMoreButtonComponent);
    }
  };


  #filmListComponent = new FilmListView();
  #filmContainer = this.#filmListComponent.element.querySelector('.films-list__container');
  #loadMoreButtonComponent = null;
  #popupPresenterComponent = null;
  #sortComponent = null;
  #commentsList = null;
  #currentSortType = SortType.DEFAULT;

  //избавились от ранее созданных
  // #sourcedfilmContainer = [];
  // #listMovieMovieInfo = [];

  constructor({header, main, footer, movieModel, body}) {
    this.#header = header;
    this.#main = main;
    this.#footer = footer;
    this.#movieModel = movieModel;
    this.#body = body;

  }

  get movie() {
    switch (this.#currentSortType) {
      case SortType.DATE:
        return [...this.#movieModel.movie].sort(sortMovieDate);
      case SortType.RATING:
        return [...this.#movieModel.movie].sort(sortMovieRating);
    }

    return this.#movieModel.movie;
  }

  get comments() {
    return this.#movieModel.comments;
  }

  init() {
    // this.#loadedComments = this.#movieModel.comments;
    this.#renderBoard();
  }


  #renderMovie(movie) {
    const moviePresenter = new MoviePresenter({
      filmContainer: this.#filmContainer,

      onShowPopupClick: this.#openPopup,


      onDataChange: this.#handleDataChange,
    });
    moviePresenter.init(movie);
    this.#moviePresenter.set(movie.id, moviePresenter);
  }

  #handleDataChange = (updatedMovie) => {
    //здесь вызывается обновление модели


    this.#moviePresenter.get(updatedMovie.id).init(updatedMovie);

    if (this.#popupPresenterComponent) {
      this.#popupPresenterComponent.destroy();
      this.#popupPresenterComponent.init({ movie: updatedMovie });
    }
  };


  #removePopupPresenterComponent() {
    this.#popupPresenterComponent = null;
  }

  #openPopup = (movie) => {
    this.#body.classList.add('hide-overflow');
    this.#renderPopup({movie});
  };


  #clearMovieList() {
    this.#moviePresenter.forEach((presenter) => presenter.destroy());
    this.#moviePresenter.clear();
    remove(this.#loadMoreButtonComponent);
    this.#renderShowMoreBtn();
  }

  #renderPopup(movie) {
    if (this.#popupPresenterComponent) {
      this.#popupPresenterComponent.destroy();
      this.#popupPresenterComponent = null;
    }

    const popupPresenter = new PopupPresenter({
      body: this.#body,
      removePopupPresenterComponent: () => { this.#removePopupPresenterComponent(); },
      commentsList: this.#commentsList,

      onDataChange: this.#handleDataChange,
    });


    popupPresenter.init(movie);

    this.#popupPresenterComponent = popupPresenter;
  }


  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType){
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
    for(let i = 0; i < BoardPresenter.MOVIE_COUNT_PER_STEP; i++){
      this.#renderMovie(this.movie[i]);
    }
  }

  #renderBoard() {
    render(new UserNameStatusView(), this.#header);
    const filters = generateFilter(this.#movieModel.movie);
    render(new MenuView({filters}), this.#main);

    if (this.#movieModel.movie.length === 0) {
      render(new NoMovieView(), this.#main);
      return ;
    }

    this.#renderSort();
    render(this.#filmListComponent, this.#main);

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


