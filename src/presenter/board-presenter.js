import FilmListView from '../view/film-list-view.js';
import { remove, render } from '../framework/render';
import SortView from '../view/sort-view.js';
import ShowMoreButtonView from '../view/show-more-button-view.js';
import UserNameStatusView from '../view/user-name-status-view.js';
import FooterStatisticsView from '../view/footer-statistics-view.js';
import NoMovieView from '../view/no-moviecard-view.js';
import MoviePresenter from './movie-presenter.js';
import PopupPresenter from './popup-presenter.js';
import { SortType, UpdateType, UserAction } from '../const.js';
import {sortMovieDate, sortMovieRating} from '../utils/date-transform';
import { filter } from '../utils/filter.js';

export default class BoardPresenter {
  static MOVIE_COUNT_PER_STEP = 5;
  #header = null;
  #main = null;
  #footer = null;
  #movieModel = null;
  #body = null;
  #renderMovieCount = BoardPresenter.MOVIE_COUNT_PER_STEP;
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
  #filterModel = null;
  #noMovieComponent = null;
  #filterType = null;


  constructor({header, main, footer, movieModel, body, filterModel}) {
    this.#header = header;
    this.#main = main;
    this.#footer = footer;
    this.#movieModel = movieModel;
    this.#body = body;
    this.#filterModel = filterModel;

    this.#movieModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  get movie() {
    this.#filterType = this.#filterModel.filter;
    // const filterType = this.#filterModel.filter;
    const movie = this.#movieModel.movie;
    const filteredMovie = filter[this.#filterType](movie);

    switch (this.#currentSortType) {
      case SortType.DATE:
        return filteredMovie.sort(sortMovieDate);
      case SortType.RATING:
        return filteredMovie.sort(sortMovieRating);
    }

    return filteredMovie;
  }

  get comments() {
    return this.#movieModel.comments;
  }

  get filters() {
    return this.#filterModel.filters;
  }


  init() {
    this.#renderBoard();
  }

  #renderMovie(movie) {
    const moviePresenter = new MoviePresenter({
      filmContainer: this.#filmContainer,

      onShowPopupClick: this.#openPopup,


      onDataChange: this.#handleViewAction,
    });
    moviePresenter.init(movie);
    this.#moviePresenter.set(movie.id, moviePresenter);
  }

  #handleViewAction = (actionType, updateType, update) => {
    console.log(actionType, updateType, update);
    switch(actionType) {
      case UserAction.SORT_MOVIE:
        this.#movieModel.updateType(updateType, update);
        break;
      case UserAction.UPDATE_MOVIE:
        this.#movieModel.updateMovie(updateType, update);
        break;
      case UserAction.UPDATE_POPUP:
        this.#movieModel.updateMovie(updateType, update);
        break;
    }
  };

  #handleModelEvent = (updateType, data) => {
    console.log(updateType, data);
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
        this.#renderNoMovie(data);
        this.#clearMovieList();
        this.#renderMovieList(data);
        break;
    }
  };


  // #handleDataChange = (updatedMovie) => {
  //   this.#moviePresenter.get(updatedMovie.id).init(updatedMovie);
  //   if (this.#popupPresenterComponent) {
  //     this.#popupPresenterComponent.destroy();
  //     this.#popupPresenterComponent.init({ movie: updatedMovie });
  //   }
  // };


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
      movie: this.#movieModel.movie,
      body: this.#body,
      removePopupPresenterComponent: () => { this.#removePopupPresenterComponent(); },
      commentsList: this.#commentsList,
      onDataChange: this.#handleViewAction,
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
    for(let i = 0; i < BoardPresenter.MOVIE_COUNT_PER_STEP ; i++){
      if (i === this.movie.length){
        return;
      }
      this.#renderMovie(this.movie[i]);
    }
  }

  #renderNoMovie(filterType) {
    // добваить удаление при отсутствии фильмов
    this.#noMovieComponent = new NoMovieView({
      filterType: this.#filterType,
    });

    this.#filterType = filterType;
    render(this.#noMovieComponent, this.#main);
  }

  #renderBoard() {

    render(new UserNameStatusView(), this.#header);


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


