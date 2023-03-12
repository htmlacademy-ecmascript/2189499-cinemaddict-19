import { Method } from './const.js';
import ApiService from './framework/api-service.js';

export default class CommentsApiService extends ApiService {

  async getComments(movie) {
    return this._load({ url: `comments/${movie.id}` })
      .then(ApiService.parseResponse);
  }

  async addComment({commentAdd, movie}) {
    const response = await this._load({
      url: `comments/${movie}`,
      method: Method.POST,
      body: JSON.stringify(commentAdd),
      headers: new Headers({'Content-Type': 'application/json'}),
    });

    const parsedResponse = await ApiService.parseResponse(response);

    return parsedResponse;
  }

  
  async deleteComment(id) {
     const response = await this._load({
      url: `comments/${id}`,
      method: Method.DELETE
    });
    return response;
  }
}
