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
      body: JSON.stringify(movie),
      headers: new Headers({'Content-Type': 'application/json'}),
    });
    const parsedResponse = await ApiService.parsedResponce(response);
    return parsedResponse;
  }
}
