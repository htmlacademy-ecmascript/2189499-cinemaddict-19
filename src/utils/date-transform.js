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


function getWeightForNullDate(dateA, dateB){
  if (dateA === null && dateB === null) {
    return 0;
  }

  if(dateA === null) {
    return 1;
  }

  if (dateB === null) {
    return -1;
  }

  return null;

}

function sortTaskDate(taskA, taskB) {
  const weight = getWeightForNullDate(taskA.dueDate, taskB.dueDate);
  console.log(taskA);
  return weight ?? dayjs(taskA.dueDate).diff(dayjs(taskB.dueDate));
}

function sortTaskRating(taskA, taskB) {
  const weight = getWeightForNullDate(taskA.dueDate, taskB.dueDate);

  return weight ?? dayjs(taskA.dueDate).diff(dayjs(taskB.dueDate));
}

export {humanizeMovieDueDate, humanizeMovieDuration, humanizeReleaseDate, getWeightForNullDate, sortTaskDate, sortTaskRating};
