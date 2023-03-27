import MenuView from '../view/menu-view';
import { render, replace, remove } from '../framework/render';
import {FilterType, UpdateType} from '../const.js';
import { filter } from '../utils/filter';
import NoMovieView from '../view/no-moviecard-view.js';
export default class FilterMoviePresenter {
  #filterComponent = null;
  #movieModel = null;
  #filterModel = null;
  #filterContainer = null;
  #noMovieCardComponent = null;

  #allMovieLength = null;
  #watchlistMovieLength = null;
  #historyMovieLength = null;
  #favoritesMoviesLength = null;

  constructor({filterModel, movieModel, filterContainer}){
    this.#filterContainer = filterContainer;
    this.#filterModel = filterModel;
    this.#movieModel = movieModel;
    this.#movieModel.addObserver(this.#handleModelUpdate);
    this.#filterModel.addObserver(this.#handleModelUpdate);
  }

  get filters() {
    const movie = this.#movieModel.movie;
    this.#allMovieLength = filter[FilterType.ALL](movie).length;
    this.#watchlistMovieLength = filter[FilterType.WATCHLIST](movie).length;
    this.#historyMovieLength = filter[FilterType.HISTORY](movie).length;
    this.#favoritesMoviesLength = filter[FilterType.FAVORITES](movie).length;

    return [
      {
        type: FilterType.ALL,
        name: 'All',
        count: filter[FilterType.ALL](movie).length,
      },
      {
        type: FilterType.WATCHLIST,
        name: 'Watchlist',
        count: filter[FilterType.WATCHLIST](movie).length,
      },
      {
        type: FilterType.HISTORY,
        name: 'History',
        count: filter[FilterType.HISTORY](movie).length,
      },
      {
        type: FilterType.FAVORITES,
        name: 'Favorites',
        count: filter[FilterType.FAVORITES](movie).length,
      },
    ];
  }

  init() {
    const filters = this.filters;
    const prevFilterComponent = this.#filterComponent;

    this.#filterComponent = new MenuView({
      filters,
      currentFilterType: this.#filterModel.filter,
      onFilterTypeChange: this.#filterTypeChange,
    });

    if (prevFilterComponent === null) {
      render(this.#filterComponent, this.#filterContainer);
      return;
    }
    replace(this.#filterComponent, prevFilterComponent);
    remove(prevFilterComponent);


    this.#noMovieCardComponent = new NoMovieView({
      filterType: this.#filterModel.filter,
    });

    if (this.#filterModel.filter === 'All' && this.#allMovieLength === 0 ) {
      const textNoMovieMessgae = this.#filterContainer.querySelector('#no-movie');
      if (textNoMovieMessgae !== null) {
        textNoMovieMessgae.remove();
      }
      render(this.#noMovieCardComponent, this.#filterContainer);
    }
    if (this.#filterModel.filter === 'Watchlist' && this.#watchlistMovieLength === 0) {
      const textNoMovieMessgae = this.#filterContainer.querySelector('#no-movie');
      if (textNoMovieMessgae !== null) {
        textNoMovieMessgae.remove();
      }
      render(this.#noMovieCardComponent, this.#filterContainer);
    }
    if (this.#filterModel.filter === 'History' && this.#historyMovieLength === 0) {
      const textNoMovieMessgae = this.#filterContainer.querySelector('#no-movie');
      if (textNoMovieMessgae !== null) {
        textNoMovieMessgae.remove();
      }
      render(this.#noMovieCardComponent, this.#filterContainer);
    }
    if (this.#filterModel.filter === 'Favorites' && this.#favoritesMoviesLength === 0) {
      const textNoMovieMessgae = this.#filterContainer.querySelector('#no-movie');
      if (textNoMovieMessgae !== null) {
        textNoMovieMessgae.remove();
      }
      render(this.#noMovieCardComponent, this.#filterContainer);
    }

    if (this.#filterModel.filter === 'All' && this.#allMovieLength !== 0 ) {
      const textNoMovieMessgae = this.#filterContainer.querySelector('#no-movie');
      if (textNoMovieMessgae !== null) {
        textNoMovieMessgae.remove();
      }
    }

    if (this.#filterModel.filter === 'Watchlist' && this.#watchlistMovieLength !== 0 ) {
      const textNoMovieMessgae = this.#filterContainer.querySelector('#no-movie');
      if (textNoMovieMessgae !== null) {
        textNoMovieMessgae.remove();
      }
    }

    if (this.#filterModel.filter === 'History' && this.#historyMovieLength !== 0 ) {
      const textNoMovieMessgae = this.#filterContainer.querySelector('#no-movie');
      if (textNoMovieMessgae !== null) {
        textNoMovieMessgae.remove();
      }
    }

    if (this.#filterModel.filter === 'Favorites' && this.#favoritesMoviesLength !== 0 ) {
      const textNoMovieMessgae = this.#filterContainer.querySelector('#no-movie');
      if (textNoMovieMessgae !== null) {
        textNoMovieMessgae.remove();
      }
    }

  }

  #handleModelUpdate = () => {
    this.init();
  };

  #filterTypeChange = (filterType) => {
    if (this.#filterModel.filter === filterType) {
      return;
    }
    this.#filterModel.setFilter(UpdateType.MAJOR, filterType);
  };

}
