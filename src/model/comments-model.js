import Observable from '../framework/observable.js';
import { mockComments } from '../mock/movies.js';


export default class CommentModel extends Observable {
  #comments = mockComments;

  get comments() {
    return this.#comments;
  }


  addСomment (updateType, update) {
    this.#comments = [
      ...this.#comments,
      update
    ];

    this._notify(updateType, update);
  }

  deleteСomment (updateType, update) {
    const index = this.#comments.findIndex((comment) => comment.id === update.commentId );

    if (index === -1) {
      throw new Error('Can\'t delete unexisting comment');
    }

    // this.#comments = [
      // ...this.#comments.slice(0, index),
    delete update.movie.comments.commentId,
      // ...this.#comments.slice(index + 1),
    // ];

    this._notify(updateType, update);
  }
}
