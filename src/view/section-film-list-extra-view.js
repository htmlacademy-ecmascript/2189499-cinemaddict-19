import {createElement} from '../render.js';

function createSectionFilmListExtraTemplate() {
  return '<section class="films-list films-list--extra"></section>';
}

export default class SectionFilmListExtraView {
  #element = null;
  get template() {
    return createSectionFilmListExtraTemplate();
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  removeElement() {
    this.#element = null;
  }
}

