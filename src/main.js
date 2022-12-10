import BoardPresenter from './presenter/board-presenter';
import UserNameView from './view/user-name-status-view';

import { render } from './render';

const siteMainElement = document.querySelector('.main');

const boardPresenter = new BoardPresenter({boardContainer: siteMainElement});
const siteHeaderElement = document.querySelector('.header');


render(new UserNameView(), siteHeaderElement);

boardPresenter.init();
