import MenuView from '../view/menu-view';
import { render, replace, remove } from '../framework/render';
import {FilterType, UpdateType, UserAction} from '../const.js';
import { filter } from '../utils/filter';

const filters = [
  {
    type: 'all',
    name: 'ALL',
    count: 0
  }
];

export default class FilterMoviePresenter {
  #filterComponentContainer = null;
  #currentFilterType = 'All';
  #filterComponent = null;
  #main = null;
  #movieModel = null;
  #all = null;
  #favorite = null;
  #watched = null;
  #watchlist = null;
  #filterModel = null;
  #filterContainer = null;
  constructor({ main, filterModel, movieModel, filterContainer}){
    this.#filterContainer = filterContainer;
    this.#main = main;
    this.#filterModel = filterModel;
    this.#movieModel = movieModel;

    this.#movieModel.addObserver(this.#handleModelUpdate);
    this.#filterModel.addObserver(this.#handleModelUpdate);
  }

  get filters() {
    const movie = this.#movieModel.movie;

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
    const movie = this.#movieModel.movie;

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
