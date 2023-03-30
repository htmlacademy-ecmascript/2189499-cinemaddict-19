import AbstractView from '../framework/view/abstract-view.js';

function createMenuTemplate(currentFilterType, filters) {

  const isAll = (filters === 'All')
    ? 'main-navigation__item--active'
    : '';

  const isWatchlist = (filters === 'Watchlist')
    ? 'main-navigation__item--active'
    : '';

  const isHistory = (filters === 'History')
    ? 'main-navigation__item--active'
    : '';

  const isFavorite = (filters === 'Favorites')
    ? 'main-navigation__item--active'
    : '';

  return (`
    <nav class="main-navigation">
      <a href="#all" class="main-navigation__item ${isAll}" data-filter-type="All">All movies ${currentFilterType[0].count}</a>
      <a href="#watchlist" class="main-navigation__item ${isWatchlist}" data-filter-type="Watchlist">Watchlist <span class="main-navigation__item-count">${currentFilterType[1].count}</span></a>
      <a href="#history" class="main-navigation__item ${isHistory}" data-filter-type="History">History <span class="main-navigation__item-count">${currentFilterType[2].count}</span></a>
      <a href="#favorites" class="main-navigation__item ${isFavorite}" data-filter-type="Favorites">Favorites <span class="main-navigation__item-count">${currentFilterType[3].count}</span></a>
    </nav>
  `);
}

export default class FilterView extends AbstractView {
  #filters = null;
  #currentFilterType = null;
  #handleFilterTypeChange = null;

  constructor({filters, currentFilterType, onFilterTypeChange}) {
    super();
    this.#filters = filters;
    this.#currentFilterType = currentFilterType;
    this.#handleFilterTypeChange = onFilterTypeChange;
    this.element.querySelectorAll('.main-navigation__item').forEach((element) => element.addEventListener('click', this.#filterTypeChangeHandler));
  }

  get template() {
    return createMenuTemplate(this.#filters, this.#currentFilterType);
  }

  #filterTypeChangeHandler = (evt) => {
    evt.preventDefault();
    this.#handleFilterTypeChange(evt.target.dataset.filterType);
  };
}
