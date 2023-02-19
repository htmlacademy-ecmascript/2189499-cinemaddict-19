import { UpdateType } from '../const.js';
import Observable from '../framework/observable.js';

export default class MovieModel extends Observable {
  #movieApiService = null;
  #movie = [];

  constructor({movieApiService}){
    super();
    this.#movieApiService = movieApiService;

    this.#movieApiService.movie.then((movie) => {
      console.log(movie.map(this.#adaptToClient));
    });
  }

  get movie() {
    return this.#movie;
  }

  set movie(movie) {
    this.#movie = movie;
  }

  async init() {
    debugger;
    try {
      const movie = await this.#movieApiService.movie;
      this.#movie = movie.map(this.#adaptToClient);
      console.log(this.#movie);
    } catch(err) {
      this.#movie = [];
    }
    this._notify(UpdateType.INIT);
  }

  updateMovie(updatedType, update) {
    const index = this.#movie.findIndex((movie) => movie.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting film');
    }

    this.#movie = [
      ...this.#movie.slice(0, index),
      update,
      ...this.#movie.slice(index + 1)
    ];

    this._notify(updatedType, update);
  }

  #adaptToClient(movie){
    const adaptedMovie = {...movie,
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
      userDetails: {...movie['user_details'],
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

