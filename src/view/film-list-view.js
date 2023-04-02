import AbstractView from '../framework/view/abstract-view.js';

function createFilmListTemplate() {
  return `<section class="films">
  <section class="films-list">
  <div class="wrap-sort"></div>
  <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>
  <div class="films-list__container">
  </div>
  </section>
  </section>`;
}

export default class FilmListView extends AbstractView{
  get template() {
    return createFilmListTemplate();
  }
}
