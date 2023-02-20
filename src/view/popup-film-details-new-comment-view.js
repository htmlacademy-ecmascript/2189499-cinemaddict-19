import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import he from 'he';

function createPopupFilmDetailsNewCommentTemplate({emoji, comment}) {
  return (`<form class="film-details__new-comment" action="" method="get">
      <div class="film-details__add-emoji-label">${(emoji) ? `<img src=${emoji} width="55" height="55">` : ''}</div>

      <label class="film-details__comment-label">
        <textarea class="film-details__comment-input" placeholder="${he.encode('Select reaction below and write comment here')}" name="${comment}">${comment}</textarea>
      </label>

      <div class="film-details__emoji-list">
        <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-smile" value="smile" ${(emoji.includes('smile')) ? 'checked' : ''}>
        <label class="film-details__emoji-label" for="emoji-smile">
          <img src="./images/emoji/smile.png" width="30" height="30" alt="emoji">
        </label>

        <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="sleeping" ${(emoji.includes('sleeping')) ? 'checked' : ''}>
        <label class="film-details__emoji-label" for="emoji-sleeping">
          <img src="./images/emoji/sleeping.png" width="30" height="30" alt="emoji">
        </label>

        <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-puke" value="puke" ${(emoji.includes('puke')) ? 'checked' : ''}>
        <label class="film-details__emoji-label" for="emoji-puke">
          <img src="./images/emoji/puke.png" width="30" height="30" alt="emoji">
        </label>

        <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-angry" value="angry" ${(emoji.includes('angry')) ? 'checked' : ''}>
        <label class="film-details__emoji-label" for="emoji-angry">
          <img src="./images/emoji/angry.png" width="30" height="30" alt="emoji">
        </label>
      </div>
    </form>`
  );
}

export default class PopupFilmDetailNewCommentView extends AbstractStatefulView {
  #initialState = {
    emoji: '',
    comment: '',
  };

  constructor() {
    super();
    this._setState(this.#initialState);
    this._restoreHandlers();
  }

  _restoreHandlers() {
    this.element.querySelector('.film-details__emoji-list')
      .addEventListener('click', this.#emojiClickHandler);
  }

  get template() {
    const {emoji, comment} = this._state;
    return createPopupFilmDetailsNewCommentTemplate({emoji, comment});
  }

  reset() {
    this.updateElement(this.#initialState);
  }

  #emojiClickHandler = (evt) => {
    if(evt.target.tagName !== 'IMG') {
      return;
    }
    this.updateElement({
      emoji: evt.target.src,
      comment: document.querySelector('.film-details__comment-input').value,
    });
  };
}
