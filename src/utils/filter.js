import { FilterType } from '../const.js';

function filterParam(movie, field) {
  return movie.userDetails[field];
}

const filter = {
  [FilterType.ALL]: (movies) => movies,
  [FilterType.WATCHLIST]: (movies) => movies.filter((movie) => filterParam(movie, 'watchlist')),
  [FilterType.HISTORY]: (movies) => movies.filter((movie) => filterParam(movie, 'alreadyWatched')),
  [FilterType.FAVORITES]: (movies) => movies.filter((movie) => filterParam(movie, 'favorite')),
};

export {filter};

