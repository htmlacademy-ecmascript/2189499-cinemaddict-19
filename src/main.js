import BoardPresenter from './presenter/board-presenter';

const siteHeaderElement = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');
const siteFooterElement = document.querySelector('.footer');
const mainPresenter = new BoardPresenter({header: siteHeaderElement, main: siteMainElement, footer: siteFooterElement});

// headerPresenter.initHerader();
mainPresenter.initHeader();
mainPresenter.initMain();
mainPresenter.initFooter();
