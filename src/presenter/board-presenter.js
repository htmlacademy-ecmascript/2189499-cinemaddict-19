import CardFilmsView from '../view/card-films-view.js';
import FilmListView from '../view/film-list-view.js';
import SectionFilmsView from '../view/section-films-view.js';
import MenuView from '../view/menu-view.js';
import { render } from '../render.js';
import SortView from '../view/sort-view.js';
import ShowMoreButtonView from '../view/show-more-button-view.js';
import UserNameStatusView from '../view/user-name-status-view.js';
import FooterStatisticsView from '../view/footer-statistics-view.js';
import PopupView from '../view/popup-view';
import PopupFilmDetailsCommentsTitleView from '../view/popup-film-details-comments-title-view.js';
import PopupFilmCommentStructureView from '../view/popup-film-comment-structure-view.js';
import PopupFilmDetailNewCommentView from '../view/popup-film-details-new-comment-view.js';


export default class BoardPresenter {
  #header = null;
  #main = null;
  #footer = null;
  #movieModel = null;
  #body = null;
  #listMovieMovieInfo = [];
  #loadedComments = null;

  #sectionFilmsComponent = new SectionFilmsView();


  #filmListComponent = new FilmListView();
  #filmContainer = this.#filmListComponent.element.querySelector('.films-list__container');


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


  #renderMovieList(movie) {

    const movieCardView = new CardFilmsView({movie});
    render(movieCardView, this.#filmContainer);

    const openPopup = () => {
      this.#renderPopup({movie});
      this.#body.classList.add('hide-overflow');
    };

    movieCardView.element.querySelector('.film-card__link').addEventListener('click', () => {
      openPopup();
    });
  }


  #renderPopup(movie) {
    const popupView = new PopupView(movie);
    render(popupView, this.#body);

    const filmDetailsCommentsTitle = popupView.element.querySelector('.film-details__comments-title');
    render(new PopupFilmDetailsCommentsTitleView(movie),filmDetailsCommentsTitle);
    const commentList = popupView.element.querySelector('.film-details__comments-list');
    movie.movie.comments.forEach((element, index) => {
      render(new PopupFilmCommentStructureView(element), commentList);
    });

    render(new PopupFilmDetailNewCommentView(), commentList);


    const closePopup = () => {
      popupView.element.parentElement.removeChild(popupView.element);
      popupView.removeElement();
      this.#body.classList.remove('hide-overflow');
    };

    popupView.element.querySelector('.film-details__close-btn').addEventListener('click', () => {
      closePopup();
    });

    const escKeydownHandler = (evt) => {

      if(evt.key === 'Escape' || evt.key === 'Esc') {
        evt.preventDefault();
        closePopup();
        document.removeEventListener('keydown', escKeydownHandler);
      }
    };

    document.addEventListener('keydown', escKeydownHandler);
  }

  #renderBoard() {
    render(new UserNameStatusView(), this.#header);
    render(new MenuView(), this.#main);
    render(new SortView(), this.#main);
    render(this.#filmListComponent, this.#main);
    render(new ShowMoreButtonView(), this.#main);


    {render(new FooterStatisticsView(), this.#footer);}

    for(let i = 0; i < this.#listMovieMovieInfo.length; i++){
      this.#renderMovieList(this.#listMovieMovieInfo[i]);
    }


  }
}


