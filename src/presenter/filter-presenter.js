import MenuView from '../view/menu-view';
import { render } from '../framework/render';

export default class FilterMoviePresenter {
  #filterComponentContainer = null;
  #currentFilterType = 'all';
  #filterComponent = null;
  #main = null;
  #filterModel = null;
  constructor({listFilterContainer, main, filterModel}){
    this.#filterComponentContainer = listFilterContainer;
    this.#main = main;
    this.#filterModel = filterModel;
  }


  init() {
    console.log(this.#main);
    this.#filterComponent = new MenuView({

    });
    render(this.#filterComponent, this.#main);
  }
}