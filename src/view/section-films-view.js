import {createElement} from '../render.js';

function createSectionFilmsTemplate() {
  return '<section class="films"></section>';
}

export default class SectionFilmsView {
  getTemplate() {
    return createSectionFilmsTemplate();
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
