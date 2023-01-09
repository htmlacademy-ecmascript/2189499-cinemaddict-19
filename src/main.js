import BoardPresenter from './presenter/board-presenter';
import MovieModel from './model/movies-model';
import { generateFilter } from './mock/filters';
import { render } from './framework/render';
import MenuView from './view/menu-view';
const siteHeaderElement = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');
const siteFooterElement = document.querySelector('.footer');
const siteBodyElement = document.querySelector('body');
const movieModel = new MovieModel();
const mainPresenter = new BoardPresenter({
  header: siteHeaderElement,
  main: siteMainElement,
  footer: siteFooterElement,
  body: siteBodyElement,
  movieModel
});
const filters = generateFilter(movieModel.movie);

// console.log(filters);
render(new MenuView(filters), siteBodyElement);
mainPresenter.init();
