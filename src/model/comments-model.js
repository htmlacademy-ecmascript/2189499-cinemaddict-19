import Observable from '../framework/observable.js';
import { mockComments } from '../mock/movies';

export default class CommentsModel extends Observable {
  #comments = mockComments;

  get comments() {
    return this.#comments;
  }

  set comments(comments) {
    this.#comments = comments;
  }


  updateMovie(updatedType, update) {
    const index = this.#comments.findIndex((comment) => comment.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting film');
    }

    this.#comments = [
      ...this.#comments.slice(0, index),
      update,
      ...this.#comments.slice(index + 1)
    ];

    this._notify(updatedType, update);
  }

}
