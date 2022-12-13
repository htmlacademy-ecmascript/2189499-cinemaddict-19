import dayjs from 'dayjs';

const DATE_FORMAT = 'YYYY';

function humanizeMovieDueDate(dueDate) {
  return dueDate ? dayjs(dueDate).format(DATE_FORMAT) : '';
}

function getRandomArrayElement(items) {
  return items[Math.floor(Math.random() * items.length)];
}

export{getRandomArrayElement,humanizeMovieDueDate};
