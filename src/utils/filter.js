import { FilterType } from '../const.js';


function isMovieWatchlist(watched){
  const {userDetails: {watchlist}} = watched;
  return watchlist;
}
function isMovieHistory(history){
  const {userDetails: {alreadyWatched}} = history;
  return alreadyWatched;
}
function isMovieFavorites(favorites){
  const {userDetails: {favorite}} = favorites;
  return favorite;
}


const filter = {
  [FilterType.ALL]: (movies) => movies,
  [FilterType.WATCHLIST]: (movies) => movies.filter((watched) => isMovieWatchlist(watched)),
  [FilterType.HISTORY]: (movies) => movies.filter((alreadyWatched) => isMovieHistory(alreadyWatched)),
  [FilterType.FAVORITES]: (movies) => movies.filter((favorite) => isMovieFavorites(favorite)),
};


export {filter};

