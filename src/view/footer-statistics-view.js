import AbstractView from '../framework/view/abstract-view.js';

function createFooterStatisticsTemplate(movieCount) {
  return `<p>${movieCount} movies inside</p>`;
}

export default class FooterStatisticsView extends AbstractView {
  #movieCount = null;

  constructor({movieCount}) {
    super();
    this.#movieCount = movieCount;
  }

  get template() {
    return createFooterStatisticsTemplate(this.#movieCount);
  }

}
