import AbstractView from '../framework/view/abstract-view.js';

function createMenuTemplate({name, count}, isSelected) {
  return `
  <a href="#${name}" class="main-navigation__item ${isSelected ? 'main-navigation__item--active' : ''} ${count === 0 ? 'main-navigation__item' : ''}">${name} <span class="main-navigation__item-count">${count}</span></a>
`;
}


function createFilterTemplate(filterItems) {
  const filterItemsTemplate = filterItems
    .map((filter, index) => createMenuTemplate(filter, index === 0))
    .join('');

  return (
    `<nav class="main-navigation">
    <a href="#all" class="main-navigation__item">All movies</a>
      ${filterItemsTemplate}
        </nav>`
  );
}

export default class MenuView extends AbstractView{
  #filters = null;
  #onClick = null;
  #currentFilterType = null;
  constructor({filters, onClick, filterType}) {
    super();
    this.#filters = filters;
    this.#onClick = () => { onClick(); };
    this.#currentFilterType = filterType;
    this.element.querySelectorAll('.main-navigation__item').forEach((element) => element.addEventListener('click', this.#onClickFilter));
  }

  get template() {
    return createFilterTemplate(this.#filters);
  }

  #onClickFilter = (evt) => {
    evt.preventDefault();
    this.#onClick(evt.target.dataset.filterType);
    if(this.#currentFilterType === evt.target.dataset.filterType) {
      return;
    }
    this.currentFilterType = evt.target.dataset.filterType;
    console.log('some push');
  }
  setActiveFilterControl = () => {
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
