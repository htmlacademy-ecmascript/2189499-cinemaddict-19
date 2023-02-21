import Observable from '../framework/observable.js';
import { mockComments } from '../mock/movies.js';


function adaptCommentsToClient(comments) {
  comments.date = new Date(comments.date);

  return comments;
}

export default class CommentsModel extends Observable {
  debugger;
  #comments = [];
  #commentsApiService = null;
  constructor({commentsApiService}) {
    super();
    this.#commentsApiService = commentsApiService;
  }

  async init(card) {
    try {
      const comments = await this.#commentsApiService.getComments(card);
      this.#comments = comments.map(adaptCommentsToClient);
    } catch(err) {
      this.#comments = [];
    }
  }

  // async comments(movieId) {
  //   return await this.#commentsApiService.comments(movieId);
  // }

  // async addComment(updateType, update) {
  //   try {
  //     this.#commentsApiService.addComment(update.id, update.commentToAdd);
  //     delete update.commentToAdd;
  //     this._notify(updateType, update);
  //   } catch(err) {
  //     throw new Error('Can\'t add comment');
  //   }
  // }

  // async deleteComment(updateType, update) {
  //   try {
  //     this.#commentsApiService.deleteComment(update.commentToDelete.id);
  //     delete update.commentToDelete;
  //     this._notify(updateType, update);
  //   } catch(err) {
  //     throw new Error('Can\'t delete comment');
  //   }
  // }
}
