import Observable from '../framework/observable.js';
import { mockComments } from '../mock/movies.js';


export default class CommentsModel extends Observable {
  debugger;
  #comments = mockComments;
  #commentsApiService = null;
  constructor({commentsApiService}) {
    super();
    this.#commentsApiService = commentsApiService;
  }

  async comments(movieId) {
    return this.#commentsApiService.comments(movieId);
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
    this.#comments = [
      ...this.#comments.slice(0, index),
      ...this.#comments.slice(index + 1),
    ];
    this._notify(updateType);
  }
}
