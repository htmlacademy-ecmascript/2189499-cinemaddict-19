import MenuView from '../view/menu-view';
import { render } from '../framework/render';
import {UpdateType} from '../const.js';

export default class FilterMoviePresenter {
  #filterComponentContainer = null;
  #currentFilterType = 'all';
  #filterComponent = null;
  #main = null;
  #movieModel = null;
  #all = null;
  #favorite = null;
  #watched = null;
  #watchlist = null;
  #filterModel = null;
  constructor({listFilterContainer, main, filterModel, movie}){
    this.#filterComponentContainer = listFilterContainer;
    this.#main = main;
    this.#filterModel = filterModel;
    this.#movieModel = movie;
    this.#all = [...this.#movieModel.movie];

    // this.#filmFiltersModel.addObserver(this.#handleModelUpdate);

  }

  get all() { 
    return this.#all;
  }

  get favorite() {
    this.#favorite = this.#all.filter((film) => film.userDetails.favorite);
    return this.#favorite;
  }

  get watched() {
    this.#watched = this.#all.filter((film) => film.userDetails.alreadyWatched);
    return this.#watched;
  }

  get watchlist() {
    this.#watchlist = this.#all.filter((film) => film.userDetails.watchlist);
    return this.#watchlist;
  }

  updateFilter(updateType, update) {
    this.currentFilterType = update;
    this._notify(updateType, update);
  }

  updateData(updateType, films) {
    switch (updateType) {
      case UpdateType.PATCH:
        break;
      case UpdateType.MINOR:
        this.#all = [...films];
        this.userFilters = {
          watchlist: this.watchlist.length,
          watched: this.watched.length,
          favorite: this.favorite.length,
        };
        this._notify(updateType, this.userFilters);
        break;
      case UpdateType.MAJOR:
        break;
    }
  }

  init() {
    console.log(this.#movieModel)
    this.#filterComponent = new MenuView({

    });
    render(this.#filterComponent, this.#main);
  }

  #handleModelUpdate = (updateType, userFilters) => {
    this.update(userFilters);
  };
}