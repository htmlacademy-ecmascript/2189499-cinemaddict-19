const FilterType = {
  ALL: 'All',
  WATCHLIST: 'Watchlist',
  HISTORY: 'History',
  FAVORITES: 'Favorites',
};

const SortType = {
  DEFAULT: 'default',
  DATE: 'date',
  RATING: 'rating',
};

const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
  COMMENT: 'COMMENT',
  INIT: 'INIT',
};

const UserAction = {
  SORT_MOVIE: 'SORT_MOVIE',
  UPDATE_MOVIE: 'UPDATE_MOVIE',
  UPDATE_POPUP: 'UPDATE_POPUP',
  MINOR_POPUP: 'MINOR_POPUP',
  DELETE_COMMENT: 'DELETE_COMMENT',
  ADD_COMMENT: 'ADD_COMMENT',
};

const Method = {
  GET: 'GET',
  PUT: 'PUT',
  DELETE: 'DELETE',
  POST: 'POST',
};

export {FilterType, SortType, UpdateType, UserAction, Method};
