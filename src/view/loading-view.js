import AbstractView from '../framework/view/abstract-view';

function createNoMovieTemplate() {
  return (
    '<h2 class="films-list__title">Loading...</h2>'
  );
}

export default class LoadingView extends AbstractView {
  get template() {
    return createNoMovieTemplate();
  }
}
