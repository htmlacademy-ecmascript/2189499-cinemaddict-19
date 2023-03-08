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
    debugger;
    try {
      const newComment = await this.#commentsApiServiсe.addComment(update);
      this.#comments = newComment.comments;
      console.log(newComment);
      this._notify(updateType, this.#adaptToClient(newComment.movie));
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

  #adaptToClient(movie){
    const adaptedMovie = {
      ...movie,
      filmInfo: {...movie['film_info'],
        alternativeTitle: movie['film_info'].alternative_title,
        ageRating: movie['film_info'].age_rating,
        totalRating: movie['film_info'].total_rating,
        release: {...movie['film_info'].release,
          releaseCountry: movie['film_info'].release.release_country,
          date: movie['film_info'].release.date !== null
            ? new Date(movie['film_info'].release.date) : movie['film_info'].release.date,
        },
      },
      userDetails: {
        ...movie['user_details'],
        alreadyWatched: movie['user_details'].already_watched,
        watchingDate: movie['user_details'].watching_date !== null
          ? new Date(movie['user_details'].watching_date) : movie['user_details'].watching_date,
      },
    };

    delete adaptedMovie['film_info'];
    delete adaptedMovie['user_details'];
    delete adaptedMovie.filmInfo.total_rating;
    delete adaptedMovie.filmInfo.age_rating;
    delete adaptedMovie.filmInfo.alternative_title;
    delete adaptedMovie.filmInfo.release.release_country;
    delete adaptedMovie.userDetails.already_watched;
    delete adaptedMovie.userDetails.watching_date;

    return adaptedMovie;
  }
}
