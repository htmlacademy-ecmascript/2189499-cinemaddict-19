import BoardPresenter from './presenter/board-presenter';

const siteHeaderElement = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');
const siteFooterElement = document.querySelector('.footer');
const mainPresenter = new BoardPresenter({main: siteMainElement});
const headerPresenter = new BoardPresenter({header: siteHeaderElement});
const footerPresenter = new BoardPresenter({footer: siteFooterElement});

// headerPresenter.initHerader();
headerPresenter.initHeader();
mainPresenter.initMain();
footerPresenter.initFooter();
