import AbstractView from '../framework/view/abstract-view.js';

function createShowMoreButtonTemplate() {
  return '<button class="films-list__show-more">Show more</button>';
}

export default class ShowMoreButtonView extends AbstractView {
  #handleShowMoreClick = null;
  constructor({onShowMoreClick}) {
    super();
    this.#handleShowMoreClick = onShowMoreClick;
    this.element.addEventListener('click', this.#showMoreHandler);
  }

  get template() {
    return createShowMoreButtonTemplate();
  }

  #showMoreHandler = (evt) => {
    evt.preventDefault();
    this.#handleShowMoreClick();
  };
}
