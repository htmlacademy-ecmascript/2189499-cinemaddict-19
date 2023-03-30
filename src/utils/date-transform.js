import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import { Format } from '../const';
dayjs.extend(duration);

function humanizeMovieDueDate(dueDate) {
  return dueDate ? dayjs(dueDate).format(Format.DATE_FORMAT) : '';
}

function humanizeMovieDuration(durationTime) {
  return durationTime ? dayjs.duration(durationTime, 'minutes').format(Format.DURATION_FORMAT) : '';
}

function humanizeCommentDate(commentDate) {
  return commentDate ? dayjs(commentDate).format(Format.COMMENT_FORMAT) : '';
}

function humanizeReleaseDate(releaseDate) {
  return releaseDate ? dayjs(releaseDate).format(Format.RELEASE_FORMAT) : '';
}

function sortMovieDate(movieA, movieB) {
  return dayjs(movieA.filmInfo.release.date).diff(dayjs(movieB.filmInfo.release.date));
}

function sortMovieRating(movieA, movieB) {
  return dayjs(movieA.filmInfo.totalRating).diff(dayjs(movieB.filmInfo.totalRating));
}

function sortMovieDefault(movieA, movieB) {
  return movieA.id - movieB.id;
}

export {humanizeMovieDueDate, humanizeMovieDuration, humanizeCommentDate, sortMovieDate, sortMovieRating, humanizeReleaseDate, sortMovieDefault};
