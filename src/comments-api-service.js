import { Method } from './const.js';
import ApiService from './framework/api-service.js';

export default class CommentsApiService extends ApiService {

  async getComments(movie) {
    return this._load({ url: `comments/${movie.id}` })
      .then(ApiService.parseResponse);
  }

  async addComment(movie, comment) {
    const response = await this._load({
      url: `comments/${movie.id}`,
      method: Method.POST,
      body: JSON.stringify(comment),
      headers: new Headers({ 'Content-Type': 'application/json' })
    });
    if (response) {
      const parsedResponse = await ApiService.parseResponse(response);
      return parsedResponse;
    }
  }

  async deleteComment(id) {
    return await this._load({
      url: `comments/${id}`,
      method: Method.DELETE
    });
  }
}
