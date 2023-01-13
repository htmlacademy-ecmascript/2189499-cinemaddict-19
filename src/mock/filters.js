import {filter} from '../utils/filter.js';

function generateFilter(movie) {
  return Object.entries(filter).map(
    ([filterName, filterMovie]) => ({
      name: filterName,
      count: filterMovie(movie).length
    })
  );
}

export {generateFilter};
