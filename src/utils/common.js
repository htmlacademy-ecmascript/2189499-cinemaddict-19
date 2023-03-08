function getRandomArrayElement(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function adaptToClient(movie){
  const adaptedMovie = {
    ...movie,
    filmInfo: {...movie['film_info'],
      alternativeTitle: movie['film_info'].alternative_title,
      ageRating: movie['film_info'].age_rating,
      totalRating: movie['film_info'].total_rating,
      release: {...movie['film_info'].release,
        releaseCountry: movie['film_info'].release.release_country,
        date: movie['film_info'].release.date !== null
          ? new Date(movie['film_info'].release.date) : movie['film_info'].release.date,
      },
    },
    userDetails: {
      ...movie['user_details'],
      alreadyWatched: movie['user_details'].already_watched,
      watchingDate: movie['user_details'].watching_date !== null
        ? new Date(movie['user_details'].watching_date) : movie['user_details'].watching_date,
    },
  };

  delete adaptedMovie['film_info'];
  delete adaptedMovie['user_details'];
  delete adaptedMovie.filmInfo.total_rating;
  delete adaptedMovie.filmInfo.age_rating;
  delete adaptedMovie.filmInfo.alternative_title;
  delete adaptedMovie.filmInfo.release.release_country;
  delete adaptedMovie.userDetails.already_watched;
  delete adaptedMovie.userDetails.watching_date;

  return adaptedMovie;
}

export {getRandomArrayElement, adaptToClient};
