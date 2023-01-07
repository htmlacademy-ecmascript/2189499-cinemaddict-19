import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
dayjs.extend(duration);


const DATE_FORMAT = 'YYYY';
const DURATION_FORMAT = 'H:mm';
const RELEASE_FORMAT = 'DD MMMM YYYY';

function humanizeMovieDueDate(dueDate) {
  return dueDate ? dayjs(dueDate).format(DATE_FORMAT) : '';
}

function humanizeMovieDuration(durationTime) {
  return durationTime ? dayjs.duration(durationTime, 'minutes').format(DURATION_FORMAT) : '';
}

function humanizeReleaseDate(releaseDate) {
  return releaseDate ? dayjs(releaseDate).format(RELEASE_FORMAT) : '';
}


export {humanizeMovieDueDate, humanizeMovieDuration, humanizeReleaseDate};
