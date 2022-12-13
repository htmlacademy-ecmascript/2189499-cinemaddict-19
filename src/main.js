import BoardPresenter from './presenter/board-presenter';
import MovieModel from './model/movie-model';
const siteHeaderElement = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');
const siteFooterElement = document.querySelector('.footer');
const movieModel = new MovieModel();
const mainPresenter = new BoardPresenter({
  header: siteHeaderElement,
  main: siteMainElement,
  footer: siteFooterElement,
  movieModel
});


mainPresenter.initHeader();
mainPresenter.initMain();
mainPresenter.initFooter();
