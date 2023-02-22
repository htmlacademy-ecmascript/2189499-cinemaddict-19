import { Method } from './const.js';
import ApiService from './framework/api-service.js';

export default class CommentsApiService extends ApiService {

  async getComments(card) {
    return this._load({ url: `comments/${card.id}` })
      .then(ApiService.parseResponse);
  }

  async addComment(card, comment) {
    const response = await this._load({
      url: `comments/${card.id}`,
      method: Method.POST,
      body: JSON.stringify(comment),
      headers: new Headers({ 'Content-Type': 'application/json' })
    });
    if (response) {
      const parsedResponse = await ApiService.parseResponse(response);
      return parsedResponse;
    }
  }
}
