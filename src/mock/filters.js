import {filter} from '../utils/filter.js';

function generateFilter(listMovieMovieInfo) {
  return Object.entries(filter).map(
    (filterName, filterMovie) => ({
      name: filterName,
      count: filterMovie(listMovieMovieInfo).length
    })
  );
}
export {generateFilter};
