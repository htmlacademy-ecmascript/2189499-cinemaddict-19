
function getRandomArrayElement(items) {
  return items[Math.floor(Math.random() * items.length)];
}
function updateMovie(movies, update) {
  return movies.map((movie) => movie.id === update.id ? update : movie);
}

export {getRandomArrayElement, updateMovie};
