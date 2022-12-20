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
import PopupFilmSectionView from '../view/popup-film-section-view.js';
import PopupFilmCommentListView from '../view/popup-film-comment-list-view.js';
import PopupFilmDetailsInnerView from '../view/popup-film-details-inner-view.js';
import PopupFilmDetailsBottomContainerView from '../view/popup-film-details-bottom-container-view.js';
import PopupFilmDetailsCommentsWrapView from '../view/popup-film-details-comments-wrap-view.js';
import PopupFilmDetailsCommentsTitleView from '../view/popup-film-details-comments-title-view.js';
import PopupFilmCommentStructureView from '../view/popup-film-comment-structure-view.js';
import PopupFilmDetailNewCommentView from '../view/popup-film-details-new-comment-view.js';


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
  popupFilmSectionView = new PopupFilmSectionView();
  popupFilmCommentList = new PopupFilmCommentListView();
  popupFilmFeatilsInnerView = new PopupFilmDetailsInnerView();
  popupFilmDetailsBottomContainerView = new PopupFilmDetailsBottomContainerView();
  popupFilmDetailsCommentsWrapView = new PopupFilmDetailsCommentsWrapView();
  popupFilmDetailNewCommentView = new PopupFilmDetailNewCommentView();

  constructor({header, main, footer, movieModel, body, }) {
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
    this.popupMovie = this.movieModel.getPopupMovie();
    render(this.popupFilmSectionView, this.body);
    render(this.popupFilmFeatilsInnerView, this.popupFilmSectionView.getElement());
    render(new PopupView(this.popupMovie), this.popupFilmFeatilsInnerView.getElement());
    render(this.popupFilmDetailsBottomContainerView, this.popupFilmFeatilsInnerView.getElement());
    render(this.popupFilmDetailsCommentsWrapView, this.popupFilmDetailsBottomContainerView.getElement());
    render(new PopupFilmDetailsCommentsTitleView(), this.popupFilmDetailsCommentsWrapView.getElement());
    render(this.popupFilmCommentList,this.popupFilmDetailsCommentsWrapView.getElement());
    render(this.popupFilmDetailNewCommentView, this.popupFilmDetailsCommentsWrapView.getElement());
    for (let i = 0; i < this.popupMovie.comments.length; i++) {
      render(new PopupFilmCommentStructureView({comment: this.popupMovie.comments[i]}), this.popupFilmCommentList.getElement());
    }
  }

  init() {
    this.initHeader();
    this.initMain();
    this.initFooter();
  }
}


