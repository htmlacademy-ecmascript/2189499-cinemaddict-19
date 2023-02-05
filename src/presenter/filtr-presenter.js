import MenuView from '../view/menu-view';

export default class FilterMoviePresenter {
  #filterComponentContainer = null;
  #currentFilterType = 'all';
  #filterComponent = null;
  constuctor({listFilterContainer}){
    this.#filterComponentContainer = listFilterContainer;
  }

  init() {
    this.#filterComponent = new MenuView({

    });
    render();
  }
}