import BoardPresenter from './presenter/board-presenter';
import MovieModel from './model/movies-model';
import FilterModel from './model/filter-model';
import FilterMoviePresenter from './presenter/filter-presenter';


const siteHeaderElement = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');
const siteFooterElement = document.querySelector('.footer');
const siteBodyElement = document.querySelector('body');
const movieModel = new MovieModel();
const filterModel = new FilterModel();
const mainPresenter = new BoardPresenter({
  header: siteHeaderElement,
  main: siteMainElement,
  footer: siteFooterElement,
  body: siteBodyElement,
  movieModel,
  filterModel,
});

const filterPresenter = new FilterMoviePresenter({
  filterContainer: siteMainElement,
  filterModel,
  movieModel,
});
filterPresenter.init();
mainPresenter.init();
