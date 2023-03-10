import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import he from 'he';

function createPopupFilmDetailsNewCommentTemplate({emotion, comment, isDisabled}) {
  console.log(isDisabled)
  return (`<form class="film-details__new-comment" action="" method="get" ${isDisabled ? 'disabled' : ''}>
      <div class="film-details__add-emoji-label">${(emotion) ? `<img src=${emotion} width="55" height="55">` : ''}</div>

      <label class="film-details__comment-label">
        <textarea class="film-details__comment-input" placeholder="${he.encode('Select reaction below and write comment here')}" name="${comment}" ${isDisabled ? 'disabled' : ''} >${comment}</textarea>
      </label>

      <div class="film-details__emoji-list">
        <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-smile" value="smile" ${(emotion.includes('smile')) ? 'checked' : ''}>
        <label class="film-details__emoji-label" for="emoji-smile">
          <img src="./images/emoji/smile.png" width="30" height="30" alt="smile">
        </label>

        <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="sleeping" ${(emotion.includes('sleeping')) ? 'checked' : ''}>
        <label class="film-details__emoji-label" for="emoji-sleeping">
          <img src="./images/emoji/sleeping.png" width="30" height="30" alt="sleeping">
        </label>

        <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-puke" value="puke" ${(emotion.includes('puke')) ? 'checked' : ''}>
        <label class="film-details__emoji-label" for="emoji-puke">
          <img src="./images/emoji/puke.png" width="30" height="30" alt="puke">
        </label>

        <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-angry" value="angry" ${(emotion.includes('angry')) ? 'checked' : ''}>
        <label class="film-details__emoji-label" for="emoji-angry">
          <img src="./images/emoji/angry.png" width="30" height="30" alt="angry">
        </label>
      </div>
    </form>`
  );
}

export default class PopupFilmDetailNewCommentView extends AbstractStatefulView {
  #initialState = {
    emotion: '',
    comment: '',
    isDisabled: false,
  };

  #hanleComment = null;
  constructor({hanleComment}) {
    super();
    this._setState(this.#initialState);
    this._restoreHandlers();
    this.#hanleComment = hanleComment;
  }

  _restoreHandlers() {
    this.element.querySelector('.film-details__emoji-list')
      .addEventListener('click', this.#emojiClickHandler);
    this.element.querySelector('.film-details__comment-input')
      .addEventListener('keydown', this.#commentKeyDownHandler);
  }

  get template() {
    const {emotion, comment, isDisabled} = this._state;
    return createPopupFilmDetailsNewCommentTemplate({emotion, comment, isDisabled});
  }

  reset() {
    this.updateElement(this.#initialState);
  }

  #emojiClickHandler = (evt) => {
    if(evt.target.tagName !== 'IMG') {
      return;
    }
    this.updateElement({
      emotion: evt.target.src,
      comment: document.querySelector('.film-details__comment-input').value,
    });
  };

  #commentKeyDownHandler = (evt) => {
    if ((evt.metaKey || evt.ctrlKey) && evt.key === 'Enter') {
      
      const emotion = String(
        document.querySelector('.film-details__add-emoji-label')
          .querySelector('img')
            .src.substring(35)
              .split('.')[0]
      );
      
      this.#hanleComment({
        emotion: emotion,
        comment: document.querySelector('.film-details__comment-input').value,
      });
    }
  };
}
