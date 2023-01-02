import AbstractView from '../framework/view/abstract-view.js';

function createSectionFilmListExtraTemplate() {
  return '<section class="films-list films-list--extra"></section>';
}

export default class SectionFilmListExtraView extends AbstractView {

  get template() {
    return createSectionFilmListExtraTemplate();
  }

}

