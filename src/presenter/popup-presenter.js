import { render } from "../framework/render";
import PopupView from "../view/popup-view";

export default class PopupPresenter {
  #onClosePopupClick = null;
  #popupViewComponent = null;
  #body = null;
  constructor({onClosePopupClick, body}) {
    this.#body = body;
    this.#onClosePopupClick = onClosePopupClick;
  }

  init(movie) {
    this.#popupViewComponent = new PopupView({
      movie,
      onClosePopupClick: this.#onClosePopupClick,
    });
    render(this.#popupViewComponent, this.#body)
  }
}