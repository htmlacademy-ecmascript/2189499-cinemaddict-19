
function getRandomArrayElement(items) {
  return items[Math.floor(Math.random() * items.length)];
}
// тут надо разобраться как надо правильно использовать функцию
function updateMovie(movies, update) {
  return movies.map((movie) => movie.userDetails === update ? update : movie);
}

export {getRandomArrayElement, updateMovie};
