import ApiService from './framework/api-service';
import { Method } from './const.js';

export default class MovieApiService extends ApiService {
  get movie(){
    return this._load({url: 'movies'})
      .then(ApiService.parseResponse);
  }


  async updateMovie(movie){
    console.log(this.#adaptToServer(movie));
    const response = await this._load({
      url: `movies/${movie.id}`,
      method: Method.PUT,
      body: JSON.stringify(this.#adaptToServer(movie)),
      headers: new Headers({'Content-Type': 'application/json'}),
    });
    const parsedResponse = await ApiService.parseResponse(response);
    return parsedResponse;
  }

  #adaptToServer(movie){
    const adaptedMovie = {...movie,
      ['film_info']:{...movie.filmInfo,
        ['age_rating']: movie.filmInfo.ageRating,
        ['alternative_title']: movie.filmInfo.alternativeTitle,
        ['total_rating']: movie.filmInfo.totalRating,
        ['release']:{['release_country']: movie.filmInfo.release.releaseCountry},
      },
      ['user_details']:{...movie.userDetails,
        ['already_watched']: movie.userDetails.alreadyWatched,
        ['watching_date']: movie.userDetails.watchingDate,
      },

    };
    delete adaptedMovie['filmInfo'];
    delete adaptedMovie['userDetails'];
    delete adaptedMovie['film_info'].ageRating;
    delete adaptedMovie['film_info'].alternativeTitle;
    delete adaptedMovie['film_info'].totalRating;
    delete adaptedMovie['user_details'].alreadyWatched;
    delete adaptedMovie['user_details'].alreadyWatched;
    delete adaptedMovie['user_details'].watchingDate;

    return adaptedMovie;

  }

}
