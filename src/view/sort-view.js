import AbstractView from '../framework/view/abstract-view.js';
import { SortType } from '../const.js';


function createSortViewTemplate() {

  return (`<ul class="sort">
  <li><a href="#" class="sort__button" data-sort-type="${SortType.DEFAULT}">Sort by default</a></li>
  <li><a href="#" class="sort__button" data-sort-type="${SortType.DATE}">Sort by date</a></li>
  <li><a href="#" class="sort__button" data-sort-type="${SortType.RATING}">Sort by rating</a></li>
</ul>`);
}

export default class SortView extends AbstractView {
  #handleSortTypeChange = null;
  sortfilter = null;
  constructor({onSortTypeChange, sortfilter}){
    super();
    this.sortfilter = sortfilter;
    this.#handleSortTypeChange = onSortTypeChange;


    this.element.addEventListener('click', this.#sortTypeChangeHandler);
  }

  get template() {
    return createSortViewTemplate(this.sortfilter);
  }

  #sortTypeChangeHandler = (evt) => {
    if(evt.target.tagName !== 'A') {
      return;
    }
    evt.preventDefault();
    this.#handleSortTypeChange(evt.target.dataset.sortType);
    this.sortfilter = evt.target.dataset.sortType;
  };
}

