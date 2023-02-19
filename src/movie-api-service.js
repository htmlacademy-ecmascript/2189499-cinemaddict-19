import ApiService from './framework/api-service';

const Method = {
  GET: 'GET',
  PUT: 'PUT'
};

export default class MovieApiService extends ApiService {
  get movie(){
    return this._load({url: 'movies'})
      .then(ApiService.parseResponse);
  }


  async updateMovie(movie){
    const response = await this._load({
      url: `movie/${movie.id}`,
      method: Method.PUT,
      body: JSON.stringify(this.#adaptToServer(movie)),
      headers: new Headers({'Content-Type': 'application/json'}),
    });
    const parsedResponse = await ApiService.parsedResponce(response);
    return parsedResponse;
  }


  #adaptToServer(movie){
    const adaptedMovie = {...movie,
      'film_info': movie.filmInfo,
      'user_details': movie.userDetails,
      'age_rating': movie.filmInfo.ageRating,
      'alternative_title': movie.filmInfo.alternativeTitle,
      'release_country': movie.filmInfo.release.releaseCountry,
      'total_rating': movie.filmInfo.totalRating,
      'already_watched': movie.userDetails.alreadyWatched,
      'watching_date': movie.userDetails.watchingDate,
    };

    return adaptedMovie;

  }

}
