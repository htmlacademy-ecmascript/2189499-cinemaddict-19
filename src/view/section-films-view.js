import AbstractView from '../framework/view/abstract-view.js';

function createSectionFilmsTemplate() {
  return '<section class="films"></section>';
}

export default class SectionFilmsView extends AbstractView {

  get template() {
    return createSectionFilmsTemplate();
  }

}
