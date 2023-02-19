import { Method } from './const';
import ApiService from './framework/api-service.js';

export default class CommentsApiService extends ApiService {

  get comments() {
    return this._load({url: 'comments'})
      .then(ApiService.parseResponce);
  }
}
