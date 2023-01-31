import FilmListView from '../view/film-list-view.js';
import MenuView from '../view/menu-view.js';
import { render } from '../framework/render';
import SortView from '../view/sort-view.js';
import ShowMoreButtonView from '../view/show-more-button-view.js';
import UserNameStatusView from '../view/user-name-status-view.js';
import FooterStatisticsView from '../view/footer-statistics-view.js';
import NoMovieView from '../view/no-moviecard-view.js';
import { generateFilter } from '../mock/filters.js';
import MoviePresenter from './movie-presenter.js';
import PopupPresenter from './popup-presenter.js';


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
  #commentsList = null;

  constructor({header, main, footer, movieModel, body}) {
    this.#header = header;
    this.#main = main;
    this.#footer = footer;
    this.#movieModel = movieModel;
    this.#body = body;

  }


  init() {
    this.#listMovieMovieInfo = [...this.#movieModel.movie];
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
  };


  // #closePopup = () => {
  //   this.#popupPresenterComponent.element.parentElement.removeChild(this.#popupPresenterComponent);
  //   this.#popupPresenterComponent.removeElement();

  // };

  #openPopup = (movie) => {
    this.#renderPopup({movie});
  };

  // #closeEscBtnPopup() {
  //   const escKeydownHandler = (evt) => {

  //     if(evt.key === 'Escape' || evt.key === 'Esc') {
  //       evt.preventDefault();
  //       this.#closePopup();
  //       document.removeEventListener('keydown', escKeydownHandler);
  //     }
  //   };

  //   document.addEventListener('keydown', escKeydownHandler);
  // }

  #renderPopup(movie) {

    if (this.#popupView) {
      this.#popupView.element.remove();
    }

    const popupPresenter = new PopupPresenter({
      body: this.#body,
      commentsList: this.#commentsList,
      // onClosePopupClick: () => { this.#closePopup(); },
    });
    this.#popupPresenterComponent = popupPresenter;

    popupPresenter.init(movie);
    this.#commentsList = this.element.querySelector('.film-details__comments-list');
    // this.#closeEscBtnPopup();
  }

  #renderBoard() {
    render(new UserNameStatusView(), this.#header);
    const filters = generateFilter(this.#listMovieMovieInfo);
    render(new MenuView({filters}), this.#main);

    if (this.#listMovieMovieInfo.length === 0) {
      render(new NoMovieView(), this.#main);
      return ;
    }

    render(new SortView(), this.#main);
    render(this.#filmListComponent, this.#main);


    if(this.#listMovieMovieInfo.length > BoardPresenter.MOVIE_COUNT_PER_STEP) {
      this.#loadMoreButtonComponent = new ShowMoreButtonView({
        onShowMoreClick: this.#loadMoreButtonHandler
      });

      render(this.#loadMoreButtonComponent, this.#main);

    }

    render(new FooterStatisticsView(), this.#footer);

    for(let i = 0; i < BoardPresenter.MOVIE_COUNT_PER_STEP; i++){
      this.#renderMovie(this.#listMovieMovieInfo[i]);
    }


  }
}


