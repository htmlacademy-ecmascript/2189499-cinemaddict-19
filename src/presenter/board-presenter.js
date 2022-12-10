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

export default class BoardPresenter {
  sectionFilmsComponent = new SectionFilmsView();
  filmListComponent = new FilmListView();
  filmListContainerComponent = new FilmListContainerView();
  menuComponent = new MenuView();
  sortComponent = new SortView();
  showMoreButton = new ShowMoreButtonView();
  filmListTitle = new FilmListTitleView();

  constructor({boardContainer}) {
    this.boardContainer = boardContainer;
  }

  init() {
    render(this.menuComponent, this.boardContainer);
    render(this.sortComponent, this.boardContainer);
    render(this.filmListTitle, this.filmListComponent.getElement());
    render(this.sectionFilmsComponent, this.boardContainer);
    render(this.filmListComponent, this.sectionFilmsComponent.getElement());
    render(this.filmListContainerComponent, this.filmListComponent.getElement());
    for (let i = 0; i < 5; i++) {
      render(new CardFilmsView(), this.filmListContainerComponent.getElement());
    }
    render(this.showMoreButton, this.filmListComponent.getElement());
    render(new SectionFilmListExtraView(), this.sectionFilmsComponent.getElement());
    render(new SectionFilmListExtraView(), this.sectionFilmsComponent.getElement());
  }
}
