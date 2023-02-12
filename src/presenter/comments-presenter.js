import PopupFilmCommentStructureView from '../view/popup-film-comment-structure-view.js';

export default class CommentsPresenter {
  #popupFilmCommentStructureViewComponent = null;
  constructor(hadleDeleteCommet){


  }

  init() {
    this.#popupFilmCommentStructureViewComponent = new PopupFilmCommentStructureView({
      hadleDeleteCommet: () => { this.#deleteCommentHandler(); },
    });
  }

  #deleteCommentHandler = () => {
    console.log('some Push');
  };
}
