import Observable from '../framework/observable.js';
import { adaptToClient, adaptCommentsToClient } from '../utils/common.js';

export default class CommentsModel extends Observable {
  #comments = [];
  #commentsApiServiсe = null;

  constructor({commentsApiServiсe}) {
    super();
    this.#commentsApiServiсe = commentsApiServiсe;
  }

  get comments() {
    return this.#comments;
  }

  async init(movie) {
    try {
      const comments = await this.#commentsApiServiсe.getComments(movie);
      this.#comments = comments.map(adaptCommentsToClient);
    } catch(err) {
      this.#comments = [];
    }
  }

  async addComment(updateType, update) {
    try {
      const newComment = await this.#commentsApiServiсe.addComment(update);
      this.#comments = newComment.comments;
      this._notify(updateType, adaptToClient(newComment.movie));
    } catch(err) {
      throw new Error('Can\'t add comment');
    }
  }

  async deleteComment(updateType, update) {
    try {
      await this.#commentsApiServiсe.deleteComment(update.commentId.id);
      this.#comments = this.#comments = this.#comments.filter((comment) => comment.id !== update.commentId.id);
      this._notify(this.#comments);
    } catch(err) {
      throw new Error('Can\'t delete comment');
    }
  }

}
