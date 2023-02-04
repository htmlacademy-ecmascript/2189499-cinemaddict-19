import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
dayjs.extend(duration);


const DATE_FORMAT = 'YYYY';
const DURATION_FORMAT = 'H[h] mm';
const COMMENT_FORMAT = 'YYYY MMMM DD HH:mm';
const RELEASE_FORMAT = 'DD MMMM YYYY';

function humanizeMovieDueDate(dueDate) {
  return dueDate ? dayjs(dueDate).format(DATE_FORMAT) : '';
}

function humanizeMovieDuration(durationTime) {
  return durationTime ? dayjs.duration(durationTime, 'minutes').format(DURATION_FORMAT) : '';
}

function humanizeCommentDate(commentDate) {
  return commentDate ? dayjs(commentDate).format(COMMENT_FORMAT) : '';
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

export {humanizeMovieDueDate, humanizeMovieDuration, humanizeCommentDate, sortMovieDate, sortMovieRating, humanizeReleaseDate};
