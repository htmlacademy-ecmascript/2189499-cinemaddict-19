import Observable from '../framework/observable.js';

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


  // set comments(comments) {
  //   this.#comments = comments;
  // }

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

  // async comments(movieId) {
  //   return await this.#commentsApiService.comments(movieId);
  // }

  async addComment(updateType, update) {
    try {
      this.#commentsApiServiсe.addComment(update.id, update.commentToAdd);
      delete update.commentToAdd;
      this._notify(updateType, update);
    } catch(err) {
      throw new Error('Can\'t add comment');
    }
  }

  async deleteComment(id) {
    try {
      await this.#commentsApiServiсe.deleteComment(id);
      this.#comments = this.#comments = this.#comments.filter((comment) => comment.id !== id);
      this._notify(this.#comments);
    } catch(err) {
      throw new Error('Can\'t delete comment');
    }
  }
}
