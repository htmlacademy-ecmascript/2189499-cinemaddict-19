import {createElement} from '../render.js';

function createSectionFilmListExtraTemplate() {
  return '<section class="films-list films-list--extra"></section>';
}

export default class SectionFilmListExtraView {
  getTemplate() {
    return createSectionFilmListExtraTemplate();
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}

