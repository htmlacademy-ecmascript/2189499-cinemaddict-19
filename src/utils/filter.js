import { FilterType } from '../const.js';

function inMovieWatchlist(movie) {
  const {userDetails: {watchlist}} = movie;
  return watchlist;
}
function inMovieHistory(movie) {
  const {userDetails: {alreadyWatched}} = movie;
  return alreadyWatched;
}
function inMovieFavorites(movie) {
  const {userDetails: {favorite}} = movie;
  return favorite;
}

const filter = {
  [FilterType.ALL]: (movies) => movies,
  [FilterType.WATCHLIST]: (movies) => movies.filter((watched) => inMovieWatchlist(watched)),
  [FilterType.HISTORY]: (movies) => movies.filter((alreadyWatched) => inMovieHistory(alreadyWatched)),
  [FilterType.FAVORITES]: (movies) => movies.filter((favorite) => inMovieFavorites(favorite)),
};

export {filter};

