import { remove, render } from '../framework/render';
import PopupView from '../view/popup-view';

export default class PopupPresenter {
  #onClosePopupClick = null;
  #popupViewComponent = null;
  #body = null;

  constructor({ body}) {
    this.#body = body;
  }

  init(movie) {
    this.#popupViewComponent = new PopupView({
      movie,
      onClosePopupClick: this.#handleClosePopupClick ,
    });
    render(this.#popupViewComponent, this.#body);
  }

  #handleClosePopupClick = () => {
    console.log('close');
    remove(this.#popupViewComponent);
    this.#body.classList.remove('hide-overflow');
  };
}
