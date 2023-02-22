import Observable from '../framework/observable.js';
import { mockComments } from '../mock/movies.js';


function adaptCommentsToClient(comments) {
  comments.date = new Date(comments.date);
  console.log(comments);
  return comments;
}

export default class CommentsModel extends Observable {
  #comments = [];
  #commentsApiServiсe = null;
  constructor({commentsApiServiсe}) {
    super();
    this.#commentsApiServiсe = commentsApiServiсe;
  }


  set comments(comments) {
    this.#comments = comments;
  }

  get comments() {
    return this.#comments;
  }

  async init(movie) {
    debugger;
    try {
      const comments = await this.#commentsApiServiсe.getComments(movie);
      // this.#comments = comments.map(adaptCommentsToClient);
      this.#comments = comments;
    } catch(err) {
      this.#comments = [];
    }
    console.log(this.#comments);
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
