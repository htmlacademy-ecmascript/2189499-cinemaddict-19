import AbstractView from '../framework/view/abstract-view.js';

function createMenuTemplate(currentFilterType, filters) {
  console.log(currentFilterType);
  // console.log(currentFilterType);
  const {name, count} = currentFilterType;
  console.log(currentFilterType[0].count);
  return `
  <nav class="main-navigation">
  <a href="#all" class="main-navigation__item main-navigation__item--active" data-filter-type="all">All movies ${currentFilterType[0].count}</a>
  <a href="#watchlist" class="main-navigation__item" data-filter-type="Watchlist">Watchlist <span class="main-navigation__item-count">${currentFilterType[1].count}</span></a>
  <a href="#history" class="main-navigation__item" data-filter-type="History">History <span class="main-navigation__item-count">${currentFilterType[2].count}</span></a>
  <a href="#favorites" class="main-navigation__item" data-filter-type="Favorites">Favorites <span class="main-navigation__item-count">${currentFilterType[3].count}</span></a>
</nav>
`;
}


export default class MenuView extends AbstractView{
  #filters = null;
  #onClick = null;
  #currentFilterType = null;
  #onClickHandler = null;
  #handleFilterTypeChange = null;

  constructor({filters, onClick, currentFilterType, onFilterTypeChange}) {
    super();

    this.#filters = filters;
    this.#onClickHandler = onClick;
    this.#currentFilterType = currentFilterType;
    this.#handleFilterTypeChange = onFilterTypeChange;

    this.element.querySelectorAll('.main-navigation__item').forEach((element) => element.addEventListener('click', this.#filterTypeChangeHandler));
  }

  get template() {
    return createMenuTemplate(this.#filters, this.#currentFilterType);
  }

  #filterTypeChangeHandler = (evt) => {
    evt.preventDefault();

    // this.#onClickHandler(evt.target.dataset.filterType);
    // if(this.#currentFilterType === evt.target.dataset.filterType) {
    //   return;
    // }

    this.#currentFilterType = evt.target.dataset.filterType;
    this.#setActiveFilterControl(this.#currentFilterType);

    this.#handleFilterTypeChange(evt.target.dataset.filterType);
  };

  #setActiveFilterControl = () => {
    this.element.querySelectorAll('a')
      .forEach((element) => {
        if(element.dataset.filterType !== this.#currentFilterType) {
          element.classList.remove('main-navigation__item--active');
        } else {
          element.classList.add('main-navigation__item--active');
        }
      });
  };
}
