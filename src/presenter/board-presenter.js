import CardFilmsView from '../view/card-films-view.js';
import FilmListView from '../view/film-list-view.js';
import SectionFilmsView from '../view/section-films-view.js';
import MenuView from '../view/menu-view.js';
import { render } from '../render.js';
import FilmListContainerView from '../view/film-list-container-view.js';
import SortView from '../view/sort-view.js';
import ShowMoreButtonView from '../view/show-more-button-view.js';
import FilmListTitleView from '../view/film-list-title-view.js';
import SectionFilmListExtraView from '../view/section-film-list-extra-view.js';
import UserNameStatusView from '../view/user-name-status-view.js';
import FooterStatisticsView from '../view/footer-statistics-view.js';
import PopupView from '../view/popup-view';

export default class BoardPresenter {
  sectionFilmsComponent = new SectionFilmsView();
  filmListComponent = new FilmListView();
  filmListContainerComponent = new FilmListContainerView();
  menuComponent = new MenuView();
  sortComponent = new SortView();
  showMoreButton = new ShowMoreButtonView();
  filmListTitle = new FilmListTitleView();
  userNameStatusComponent = new UserNameStatusView();
  footerStatisticsConponent = new FooterStatisticsView();

  constructor({header, main, footer, movieModel, body}) {
    this.header = header;
    this.main = main;
    this.footer = footer;
    this.movieModel = movieModel;
    this.body = body;
  }

  initHeader() {
    render(this.userNameStatusComponent, this.header);
  }

  initMain() {
    this.listMovie = [...this.movieModel.getMovie()];
    render(this.menuComponent, this.main);
    render(this.sortComponent, this.main);
    render(this.filmListTitle, this.filmListComponent.getElement());
    render(this.sectionFilmsComponent, this.main);
    render(this.filmListComponent, this.sectionFilmsComponent.getElement());
    render(this.filmListContainerComponent, this.filmListComponent.getElement());
    for (let i = 0; i < this.listMovie.length; i++) {
      render(new CardFilmsView({movie: this.listMovie[i]}), this.filmListContainerComponent.getElement());
    }
    render(this.showMoreButton, this.filmListComponent.getElement());
    render(new SectionFilmListExtraView(), this.sectionFilmsComponent.getElement());
    render(new SectionFilmListExtraView(), this.sectionFilmsComponent.getElement());
  }

  initFooter() {
    render(this.footerStatisticsConponent, this.footer);
  }

  initPopup() {
    this.listMovie = this.movieModel.getPopupMovie();
    render(new PopupView(this.listMovie), this.body);
  }
}


