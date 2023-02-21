import { Method } from './const.js';
import ApiService from './framework/api-service.js';

export default class CommentsApiService extends ApiService {

  async getComments(card) {
    return this._load({ url: `comments/${card.id}` })
      .then(ApiService.parseResponse);
  }
}
