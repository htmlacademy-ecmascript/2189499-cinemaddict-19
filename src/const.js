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

const PopupState = {
  CLOSED: 'CLOSED',
  OPENED: 'OPENED',
};

const TimeLimit = {
  LOWER_LIMIT: 350,
  UPPER_LIMIT: 1000,
};

const Format = {
  DATE_FORMAT: 'YYYY',
  DURATION_FORMAT: 'H[h] mm',
  COMMENT_FORMAT: 'YYYY MMMM DD HH:mm',
  RELEASE_FORMAT: 'DD MMMM YYYY'
};

const SortCount = {
  WATCHLIST_COUNT: 0,
  HISTORY_COUNT: 0,
  FAVORITES_COUNT: 0,
};

export {FilterType, SortType, UpdateType, UserAction, Method, PopupState, TimeLimit, Format, SortCount};
