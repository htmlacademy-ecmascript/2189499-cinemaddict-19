import MenuView from '../view/menu-view';
import { render } from '../framework/render';

export default class FilterMoviePresenter {
  #filterComponentContainer = null;
  #currentFilterType = 'all';
  #filterComponent = null;
  #main = null;
  #movieModel = null;
  #filterModel = null;
  constructor({listFilterContainer, main, filterModel, movie}){
    this.#filterComponentContainer = listFilterContainer;
    this.#main = main;
    this.#filterModel = filterModel;
    this.#movieModel = movie;
  }

  // get all() { 
  //   return this.#all;
  // }

  // get favorite() {
  //   this.#favorite = this.#all.filter((film) => film.userDetails.favorite);
  //   return this.#favorite;
  // }

  // get watched() {
  //   this.#watched = this.#all.filter((film) => film.userDetails.alreadyWatched);
  //   return this.#watched;
  // }

  // get watchlist() {
  //   this.#watchlist = this.#all.filter((film) => film.userDetails.watchlist);
  //   return this.#watchlist;
  // }

  init() {
    console.log(this.#movieModel)
    // console.log(this.#movie);
    this.#filterComponent = new MenuView({

    });
    render(this.#filterComponent, this.#main);
  }
}