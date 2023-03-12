import Observable from '../framework/observable.js';
import { adaptToClient } from '../utils/common.js';
function adaptCommentsToClient(comment) {
  return {
    ...comment,
    date: new Date(comment.date)
  };
}

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
      console.log(newComment);
      this._notify(updateType, adaptToClient(newComment.movie));
    } catch(err) {
      throw new Error('Can\'t add comment');
    }
  }

  async deleteComment(id, update) {
    try {
      await this.#commentsApiServiсe.deleteComment(id);
      this.#comments = this.#comments = this.#comments.filter((comment) => comment.id !== id);
      this._notify(this.#comments);
    } catch(err) {
      throw new Error('Can\'t delete comment');
    }
  }

}
