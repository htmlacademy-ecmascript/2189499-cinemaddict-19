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
  // #handleModelUpdate = null;
  constructor({listFilterContainer, main, filterModel, movieModel, handleModelUpdate, filterContainer}){
    // this.#filterComponentContainer = listFilterContainer;
    this.#filterContainer = filterContainer;
    this.#main = main;
    this.#filterModel = filterModel;
    this.#movieModel = movieModel;
    // this.#all = [...this.#movieModel.movie];?????????
    // this.#handleModelUpdate = handleModelUpdate;

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

  // updateFilter(updateType, update) {
  //   this.currentFilterType = update;
  //   this._notify(updateType, update);
  // }

  // updateData(updateType, films) {
  //   switch (updateType) {
  //     case UpdateType.PATCH:
  //       break;
  //     case UpdateType.MINOR:
  //       this.#all = [...films];
  //       this.userFilters = {
  //         watchlist: this.watchlist.length,
  //         watched: this.watched.length,
  //         favorite: this.favorite.length,
  //       };
  //       this._notify(updateType, this.userFilters);
  //       break;
  //     case UpdateType.MAJOR:
  //       break;
  //   }
  // }

  init() {
    const filters = this.filters;
    const prevFilterComponent = this.#filterComponent;
    const movie = this.#movieModel.movie;


    this.#filterComponent = new MenuView({
      filters,
      currentFilterType: this.#filterModel.filter,
      onFilterTypeChange: this.#filterTypeChange,
      // onClick: () => { this.#handleModelUpdateHandler(); },
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
    debugger;
    this.#filterModel.setFilter(UpdateType.MAJOR, filterType);
  };
  // #handleModelUpdateHandler = () => {
  //   this.#handleModelUpdate(
  //     UserAction.SORT_MOVIE,
  //     UpdateType.MINOR,
  //     this.#currentFilterType
  //   );
  //   console.log(this.#currentFilterType);
  //   // this.updateFilter();
  // };
}