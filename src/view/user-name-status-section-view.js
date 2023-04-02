import AbstractView from '../framework/view/abstract-view.js';

function createUserNameStatusSectionTemplate() {
  return '<section class="header__profile profile"></section>';
}

export default class UserNameStatusSectionView extends AbstractView {
  get template() {
    return createUserNameStatusSectionTemplate();
  }
}
