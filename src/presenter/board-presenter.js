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
import { updateMovie } from '../utils/common.js';
import {sortTaskDate, sortTaskRating} from '../utils/date-transform';

export default class BoardPresenter {
  static MOVIE_COUNT_PER_STEP = 5;
  #header = null;
  #main = null;
  #footer = null;
  #movieModel = null;
  #body = null;
  #listMovieMovieInfo = [];
  #renderMovieCount = BoardPresenter.MOVIE_COUNT_PER_STEP;
  #loadedComments = null;
  #popupView = null;
  #moviePresenter = new Map();
  #newData = null;

  #loadMoreButtonHandler = () => {

    this.#listMovieMovieInfo
      .slice(this.#renderMovieCount, this.#renderMovieCount + BoardPresenter.MOVIE_COUNT_PER_STEP)
      .forEach((movie) => this.#renderMovie(movie));

    this.#renderMovieCount += BoardPresenter.MOVIE_COUNT_PER_STEP;

    if (this.#renderMovieCount >= this.#listMovieMovieInfo.length){
      this.#loadMoreButtonComponent.element.remove();
      this.#loadMoreButtonComponent.removeElement();
    }
  };


  #filmListComponent = new FilmListView();
  #filmContainer = this.#filmListComponent.element.querySelector('.films-list__container');
  #loadMoreButtonComponent = null;
  #popupPresenterComponent = null;
  #sortComponent = null;
  #commentsList = null;
  #currentSortType = SortType.DEFAULT;
  #sourcedfilmContainer = [];

  constructor({header, main, footer, movieModel, body}) {
    this.#header = header;
    this.#main = main;
    this.#footer = footer;
    this.#movieModel = movieModel;
    this.#body = body;

  }


  init() {
    this.#listMovieMovieInfo = [...this.#movieModel.movie];
    console.log(this.#listMovieMovieInfo);
    this.#sourcedfilmContainer = [...this.#movieModel.movie];
    this.#loadedComments = this.#movieModel.comments;
    this.#renderBoard();
  }


  #renderMovie(movie) {
    const moviePresenter = new MoviePresenter({
      filmContainer: this.#filmContainer,

      onShowPopupClick: () => { this.#openPopup(movie); },


      onDataChange: this.#handleDataChange,
    });
    moviePresenter.init(movie);
    this.#moviePresenter.set(movie.id, moviePresenter);
  }

  #handleDataChange = (updatedMovie) => {
    this.#listMovieMovieInfo = this.#listMovieMovieInfo.map((movie) => {
      if (movie.id === updatedMovie.id) {
        return updatedMovie;
      }
      return movie;
    });


    this.#moviePresenter.get(updatedMovie.id).init(updatedMovie);


    if (this.#popupPresenterComponent) {
      this.#popupPresenterComponent.destroy();
      this.#popupPresenterComponent.init({ movie: updatedMovie });

    }
  };


  #openPopup = (movie) => {
    this.#body.classList.add('hide-overflow');
    this.#renderPopup({movie});
  };


  #clearMovieList() {
    this.#moviePresenter.forEach((presenter) => presenter.destroy());
    this.#moviePresenter.clear();
    this.#renderMovieCount = BoardPresenter.MOVIE_COUNT_PER_STEP;
    remove(this.#loadMoreButtonComponent);
  }

  #renderPopup(movie) {
    if (this.#popupPresenterComponent) {
      this.#popupPresenterComponent.destroy();
      this.#popupPresenterComponent = null;
    }

    const popupPresenter = new PopupPresenter({
      body: this.#body,
      commentsList: this.#commentsList,

      onDataChange: this.#handleDataChange,
    });

    this.#popupPresenterComponent = popupPresenter;
    popupPresenter.init(movie);
  }


  #sortTasks(sortType) {
    switch(sortType){
      case SortType.DATE:
        this.#listMovieMovieInfo.sort(sortTaskDate());
        console.log('date');
        break;
      case SortType.RATING:
        this.#listMovieMovieInfo.sort(sortTaskRating);
        console.log('123');
        break;
      default:
        this.#listMovieMovieInfo = [...this.#sourcedfilmContainer];
        console.log('11');
    }
    console.log(this.#listMovieMovieInfo);
    this.#currentSortType = sortType;
    console.log(sortType);
  }

  #handleSortTypeChange = (sortType) => {
    debugger;
    if (this.#currentSortType === sortType){
      console.log('остались старые');
      return;
    }

    this.#sortTasks(sortType);
    this.#clearMovieList();
    // this.#renderSort();
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
      this.#renderMovie(this.#listMovieMovieInfo[i]);
    }
  }

  #renderBoard() {
    render(new UserNameStatusView(), this.#header);
    const filters = generateFilter(this.#listMovieMovieInfo);
    render(new MenuView({filters}), this.#main);

    if (this.#listMovieMovieInfo.length === 0) {
      render(new NoMovieView(), this.#main);
      return ;
    }

    this.#renderSort();
    render(this.#filmListComponent, this.#main);

    this.#renderMovieList();


    if(this.#listMovieMovieInfo.length > BoardPresenter.MOVIE_COUNT_PER_STEP) {
      this.#loadMoreButtonComponent = new ShowMoreButtonView({
        onShowMoreClick: this.#loadMoreButtonHandler
      });

      render(this.#loadMoreButtonComponent, this.#main);

    }



    render(new FooterStatisticsView(), this.#footer);




  }
}


