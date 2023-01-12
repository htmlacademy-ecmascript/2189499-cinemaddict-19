import { FilterType } from '../const.js';


function inMovieWatchlist(watched){
  const {userDetails: {watchlist}} = watched;
  return watchlist;
}
function inMovieHistory(history){
  const {userDetails: {alreadyWatched}} = history;
  return alreadyWatched;
}
function inMovieFavorites(favorites){
  const {userDetails: {favorite}} = favorites;
  return favorite;
}


const filter = {
  [FilterType.ALL]: (movies) => movies,
  [FilterType.WATCHLIST]: (movies) => movies.filter((watched) => inMovieWatchlist(watched)),
  [FilterType.HISTORY]: (movies) => movies.filter((alreadyWatched) => inMovieHistory(alreadyWatched)),
  [FilterType.FAVORITES]: (movies) => movies.filter((favorite) => inMovieFavorites(favorite)),
};


export {filter};

