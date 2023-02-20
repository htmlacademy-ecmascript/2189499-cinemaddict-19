import { Method } from './const.js';
import ApiService from './framework/api-service.js';

export default class CommentsApiService extends ApiService {

  async comments(movieId) {
    return this._load({url: `comments/${movieId}`})
      .then(ApiService.parseResponce);
  }

  async updateComment(comments, movieId){
    const responce = await this._load({
      url: `comments/${movieId}`,
      method: Method.POST,
      body: JSON.stringify(comments),
      headers: new Headers({'Content-Type': 'application/json'}),
    });

    const parsedResponce = await ApiService.parseResponse(responce);
    return parsedResponce;
  }
}
