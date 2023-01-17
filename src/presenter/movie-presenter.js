import CardFilmsView from '../view/card-films-view.js'

export default class MoviePresenter {
  #filmContainer = null;
  #movie = null;
  #movieCardView = null;
  

  constructor({filmContainer}) {
    this.#filmContainer = filmContainer;
  }

  init(movie) {
    this.movie = movie;


    const openPopup = () => {
      this.#renderPopup({movie});
      this.#body.classList.add('hide-overflow');
    };

    this.#movieCardView = new CardFilmsView({
      movie,
      onShowPopupClick: () => {
        openPopup();
      }
    });
  }
  #openPopup() {
    
  }
}
