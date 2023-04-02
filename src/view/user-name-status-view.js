import AbstractView from '../framework/view/abstract-view.js';

function createUserNameStatusTemplate(movieCount) {
  let statusText = '';

  if (movieCount >= 21) {
    statusText = 'Movie buss';
  }

  if (20 >= movieCount && movieCount >= 11) {
    statusText = 'Fan';
  }

  if (10 >= movieCount && movieCount >= 1) {
    statusText = 'Novise';
  }

  return (`<secion class="profile">
  <p class="profile__rating">${statusText}</p>
  <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
  </section>
  `);
}

export default class UserNameStatusView extends AbstractView {
  #movieCount = null;

  constructor({movieCount}) {
    super();
    this.#movieCount = movieCount;
  }

  get template() {
    return createUserNameStatusTemplate(this.#movieCount);
  }
}
