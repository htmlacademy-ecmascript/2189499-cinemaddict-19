import CardFilmsView from '../view/card-films-view.js';
import FilmListView from '../view/film-list-view.js';
import MenuView from '../view/menu-view.js';
import { render } from '../framework/render';
import SortView from '../view/sort-view.js';
import ShowMoreButtonView from '../view/show-more-button-view.js';
import UserNameStatusView from '../view/user-name-status-view.js';
import FooterStatisticsView from '../view/footer-statistics-view.js';
import PopupView from '../view/popup-view';
import PopupFilmDetailsCommentsTitleView from '../view/popup-film-details-comments-title-view.js';
import PopupFilmCommentStructureView from '../view/popup-film-comment-structure-view.js';
import PopupFilmDetailNewCommentView from '../view/popup-film-details-new-comment-view.js';
import NoMovieView from '../view/no-moviecard-view.js';
import { generateFilter } from '../mock/filters.js';


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
  #loadMoreButtonHandler = () => {

    this.#listMovieMovieInfo
      .slice(this.#renderMovieCount, this.#renderMovieCount + BoardPresenter.MOVIE_COUNT_PER_STEP)
      .forEach((movie) => this.#renderMovieList(movie));

    this.#renderMovieCount += BoardPresenter.MOVIE_COUNT_PER_STEP;

    if (this.#renderMovieCount >= this.#listMovieMovieInfo.length){
      this.#loadMoreButtonComponent.element.remove();
      this.#loadMoreButtonComponent.removeElement();
    }
  };


  #filmListComponent = new FilmListView();
  #filmContainer = this.#filmListComponent.element.querySelector('.films-list__container');
  #loadMoreButtonComponent = null;
  #menuViewComponent = null;


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

  #renderMovieView() {
    const filters = generateFilter(this.#listMovieMovieInfo);
    this.#menuViewComponent = new MenuView({filters});
    render(this.#menuViewComponent, this.#main);
  }

  #renderMovieList(movie) {
    const openPopup = () => {
      this.#renderPopup({movie});
      this.#body.classList.add('hide-overflow');
    };

    const movieCardView = new CardFilmsView({
      movie,
      onShowPopupClick: () => {
        openPopup();
      }
    });
    render(movieCardView, this.#filmContainer);

  }


  #renderPopup(movie) {
    const closePopup = () => {
      this.#popupView.element.parentElement.removeChild(this.#popupView.element);
      this.#popupView.removeElement();
      this.#body.classList.remove('hide-overflow');
    };

    if (this.#popupView) {
      this.#popupView.element.remove();
    }
    this.#popupView = new PopupView({
      movie,
      onClosePopupClick: () => closePopup.bind(this)()
    });
    render(this.#popupView, this.#body);

    const filmDetailsCommentsTitle = this.#popupView.element.querySelector('.film-details__comments-title');
    render(new PopupFilmDetailsCommentsTitleView(movie),filmDetailsCommentsTitle);
    const commentList = this.#popupView.element.querySelector('.film-details__comments-list');
    movie.movie.comments.forEach((element) => {
      render(new PopupFilmCommentStructureView(element), commentList);
    });

    render(new PopupFilmDetailNewCommentView(), commentList);

    const escKeydownHandler = (evt) => {

      if(evt.key === 'Escape' || evt.key === 'Esc') {
        evt.preventDefault();
        closePopup.bind(this)();
        document.removeEventListener('keydown', escKeydownHandler);
      }
    };

    document.addEventListener('keydown', escKeydownHandler);
  }

  #renderBoard() {
    render(new UserNameStatusView(), this.#header);
    this.#renderMovieView();
    // render(this.#menuViewComponent, this.#main);

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
      this.#renderMovieList(this.#listMovieMovieInfo[i]);
    }


  }
}


