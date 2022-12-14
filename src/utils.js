import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
dayjs.extend(duration);


const DATE_FORMAT = 'YYYY';
const DURATION_FORMAT = 'H:mm';

function humanizeMovieDueDate(dueDate) {
  return dueDate ? dayjs(dueDate).format(DATE_FORMAT) : '';
}

function humanizeMovieDuration(durationTime) {
  return dayjs.duration(durationTime, 'minutes').format(DURATION_FORMAT);
}

function getRandomArrayElement(items) {
  return items[Math.floor(Math.random() * items.length)];
}

export{getRandomArrayElement,humanizeMovieDueDate,humanizeMovieDuration};
