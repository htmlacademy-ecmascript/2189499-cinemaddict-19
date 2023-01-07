import { FilterType } from '../const.js';


function isMovieWatchlist(watchlist){
  return Object.values(watchlist).some(Boolean);
}
function isMovieHistory(alreadyWatched){
  return Object.values(alreadyWatched).some(Boolean);
}
function isMovieFavorites(favorite){
  return Object.values(favorite).some(Boolean);
}


const filter = {
  [FilterType.ALL]: (mockMovie) => mockMovie.length,
  [FilterType.WATCHLIST]: (mockMovie) => mockMovie.filter((watchlist) => isMovieWatchlist(watchlist)),
  [FilterType.HISTORY]: (mockMovie) => mockMovie.filter((alreadyWatched) => isMovieHistory(alreadyWatched)),
  [FilterType.FAVORITES]: (mockMovie) => mockMovie.filter((favorite) => isMovieFavorites(favorite)),
};

export {filter};

