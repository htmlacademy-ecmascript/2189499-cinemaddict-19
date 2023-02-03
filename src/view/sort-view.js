import AbstractStatefulView from '../framework/view/abstract-stateful-view';
import { SortType } from '../const.js';


function createSortViewTemplate(sort) {

  const isActiveWatchlist = (sort === 'default')
    ? 'sort__button--active'
    : '';

  const isActiveAlreadyWatched = (sort === 'date')
    ? 'sort__button--active'
    : '';

  const isActiveFavorite = (sort === 'rating')
    ? 'sort__button--active'
    : '';

  return (`<ul class="sort">
  <li><a href="#" class="sort__button ${isActiveWatchlist} " data-sort-type="${SortType.DEFAULT}">Sort by default</a></li>
  <li><a href="#" class="sort__button ${isActiveAlreadyWatched}" data-sort-type="${SortType.DATE}">Sort by date</a></li>
  <li><a href="#" class="sort__button ${isActiveFavorite}" data-sort-type="${SortType.RATING}">Sort by rating</a></li>
</ul>`);
}

export default class SortView extends AbstractStatefulView {
  #handleSortTypeChange = null;

  constructor({onSortTypeChange}){
    super();
    this.#handleSortTypeChange = onSortTypeChange;
    this._setState ({ sort: 'default' });
    this._restoreHandlers();


  }

  _restoreHandlers(){
    this.element.addEventListener('click', this.#sortTypeChangeHandler);
  }

  get template() {
    return createSortViewTemplate(this._state.sort);
  }

  reset() {
    this.updateElement(this._setState);
  }

  #sortTypeChangeHandler = (evt) => {
    if(evt.target.tagName !== 'A') {
      return;
    }

    evt.preventDefault();
    const sort = evt.target.dataset.sortType;
    this.#handleSortTypeChange(evt.target.dataset.sortType);
    this.updateElement({
      sort,
    });

  };
}
