import AbstractView from '../framework/view/abstract-view.js';

function createMenuTemplate() {
  return `
  <nav class="main-navigation">
  <a href="#all" class="main-navigation__item main-navigation__item--active" data-filter-type="all">All movies</a>
  <a href="#watchlist" class="main-navigation__item" data-filter-type="watchlist">Watchlist <span class="main-navigation__item-count"></span></a>
  <a href="#history" class="main-navigation__item" data-filter-type="watched">History <span class="main-navigation__item-count"></span></a>
  <a href="#favorites" class="main-navigation__item" data-filter-type="favorite">Favorites <span class="main-navigation__item-count"></span></a>
</nav>
`;
}


export default class MenuView extends AbstractView{
  #filters = null;
  #onClick = null;
  #currentFilterType = null;
  #onClickHandler = null;

  constructor({filters, onClick, filterType}) {
    super();

    this.#filters = filters;
    this.#onClickHandler = onClick;
    this.#currentFilterType = filterType;

    this.element.querySelectorAll('.main-navigation__item').forEach((element) => element.addEventListener('click', this.#onClickFilter));
  }

  get template() {
    return createMenuTemplate(this.#filters);
  }

  #onClickFilter = (evt) => {
    debugger;
    evt.preventDefault();
    
    this.#onClickHandler(evt.target.dataset.filterType);
    if(this.#currentFilterType === evt.target.dataset.filterType) {
      return;
    }
    this.#currentFilterType = evt.target.dataset.filterType;
    this.#setActiveFilterControl(this.currentFilterType);
    console.log('some push');
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
