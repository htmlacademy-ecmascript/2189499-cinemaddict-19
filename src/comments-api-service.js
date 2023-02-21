import { Method } from './const.js';
import ApiService from './framework/api-service.js';

export default class CommentsApiService extends ApiService {

  get comments() {
    return this._load({url: 'comments/CommentsId'})
      .then(ApiService.parseResponce);
  }

  async updateComment(comments, movie){
    const responce = await this._load({
      url: `comments/${movie.id}`,
      method: Method.POST,
      body: JSON.stringify(comments),
      headers: new Headers({'Content-Type': 'application/json'}),
    });

    const parsedResponce = await ApiService.parseResponse(responce);
    return parsedResponce;
  }
}
