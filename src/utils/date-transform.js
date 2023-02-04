import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
dayjs.extend(duration);


const DATE_FORMAT = 'YYYY';
const DURATION_FORMAT = 'H[h] mm';
const RELEASE_FORMAT = 'YYYY MMMM DD HH:mm';

function humanizeMovieDueDate(dueDate) {
  return dueDate ? dayjs(dueDate).format(DATE_FORMAT) : '';
}

function humanizeMovieDuration(durationTime) {
  return durationTime ? dayjs.duration(durationTime, 'minutes').format(DURATION_FORMAT) : '';
}

function humanizeReleaseDate(releaseDate) {
  return releaseDate ? dayjs(releaseDate).format(RELEASE_FORMAT) : '';
}


function sortMovieDate(movieA, movieB) {
  return dayjs(movieA.filmInfo.release.date).diff(dayjs(movieB.filmInfo.release.date));
}

function sortMovieRating(movieA, movieB) {
  return dayjs(movieA.filmInfo.totalRating).diff(dayjs(movieB.filmInfo.totalRating));
}

export {humanizeMovieDueDate, humanizeMovieDuration, humanizeReleaseDate, sortMovieDate, sortMovieRating};
