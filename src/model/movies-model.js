import Observable from '../framework/observable.js';
import { mockMovie } from '../mock/movies';

export default class MovieModel extends Observable {
  #movieApiService = null;
  #movie = mockMovie;

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
          releaseCountry: movie['film_info'].release.release_country},
      },
      userDetails: {...movie['user_details'],
        alreadyWatched: movie['user_details'].already_watched,
        watchingDate: movie['user_details'].watching_date,
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

