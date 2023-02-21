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
    return await this.#commentsApiService.comments(movieId);
  }

  async addComment(updateType, update) {
    try {
      this.#commentsApiService.addComment(update.id, update.commentToAdd);
      delete update.commentToAdd;
      this._notify(updateType, update);
    } catch(err) {
      throw new Error('Can\'t add comment');
    }
  }

  async deleteComment(updateType, update) {
    try {
      this.#commentsApiService.deleteComment(update.commentToDelete.id);
      delete update.commentToDelete;
      this._notify(updateType, update);
    } catch(err) {
      throw new Error('Can\'t delete comment');
    }
  }
}
