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

  constructor({filters}) {
    super();
    this.#filters = filters;
  }

  get template() {
    return createFilterTemplate(this.#filters);
  }
}
