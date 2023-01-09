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
  [FilterType.ALL]: (movie) => movie.filter((all) => all),
  [FilterType.WATCHLIST]: (movie) => movie.filter((watched) => isMovieWatchlist(watched)),
  [FilterType.HISTORY]: (movie) => movie.filter((alreadyWatched) => isMovieHistory(alreadyWatched)),
  [FilterType.FAVORITES]: (movie) => movie.filter((favorite) => isMovieFavorites(favorite)),
};


export {filter};

