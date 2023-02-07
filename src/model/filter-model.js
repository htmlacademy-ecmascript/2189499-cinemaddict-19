import Observable from '../framework/observable.js';
import { FilterType } from '../const.js';

export default class FilterModel extends Observable {
  #filter = FilterType.ALL;


  #all = null;
  #favorite = null;
  #watched = null;
  #watchlist = null;

  currentFilterType = 'all';

  filters = {
    all: 0,
    watchlist: 0,
    watched: 0,
    favorite: 0,
  };


  get filter() {
    return this.#filter;
  }

  constructor(){
    super();
  }

  setFilter(updateType, filter) {
    this.#filter = filter;
    this._notify(updateType, filter);
  }
}
