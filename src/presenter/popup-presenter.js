import { remove, render } from "../framework/render";
import PopupView from "../view/popup-view";

export default class PopupPresenter {
  #onClosePopupClick = null;
  #popupViewComponent = null;
  #body = null;

  constructor({ body}) {
    this.#body = body;
    // this.#onClosePopupClick = this.#handleClosePopupClick;
  }

  init(movie) {
    const prevpopupViewComponent = this.#popupViewComponent;
    this.#popupViewComponent = new PopupView({
      movie,
      onClosePopupClick: this.#handleClosePopupClick ,
    });
    render(this.#popupViewComponent, this.#body)
  }

  #remove(component) {
    remove(component)
  }

  #handleClosePopupClick = () => {
    console.log('close');
    remove(this.#popupViewComponent)
    this.#body.classList.remove('hide-overflow');
  }
}