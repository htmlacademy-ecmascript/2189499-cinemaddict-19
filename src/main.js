import BoardPresenter from './presenter/board-presenter';
import MovieModel from './model/movies-model';
import FilterModel from './model/filter-model';
import FilterMoviePresenter from './presenter/filter-presenter';
import CommentsModel from './model/comments-model';
import MovieApiService from './movie-api-service';


const AUTHORIZATION = 'Basic o0w590ik12389b';
const END_POINT = 'https://19.ecmascript.pages.academy/cinemaddict';

const siteHeaderElement = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');
const siteFooterElement = document.querySelector('.footer');
const siteBodyElement = document.querySelector('body');

const movieModel = new MovieModel({
  movieApiService: new MovieApiService(END_POINT, AUTHORIZATION)
});
// const movieModel = new MovieModel();
const filterModel = new FilterModel();
const commentsModel = new CommentsModel();
const mainPresenter = new BoardPresenter({
  header: siteHeaderElement,
  main: siteMainElement,
  footer: siteFooterElement,
  body: siteBodyElement,
  movieModel,
  filterModel,
  commentsModel,
});

const filterPresenter = new FilterMoviePresenter({
  filterContainer: siteMainElement,
  filterModel,
  movieModel,
});

filterPresenter.init();
mainPresenter.init();
movieModel.init();
