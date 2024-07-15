import { i18n } from 'app/i18n';
import moment from 'moment';

export const formatDateTimeFromTimestamp = (
  timestamp: string,
): { date: string; time: string } => {
  if (!timestamp) {
    return {
      date: '',
      time: '',
    };
  }
  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  const dateTime = new Date(+timestamp * 1000); // * 1000 Because timestamp from our API in seconds
  const today = new Date();
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  let date = `${dateTime.getDate()} ${monthNames[dateTime.getMonth()]}`;
  if (dateTime.getFullYear() !== today.getFullYear()) {
    date += ` ${dateTime.getFullYear()}`;
  } else if (dateTime.toDateString() === today.toDateString()) {
    date = i18n.general.today;
  } else if (dateTime.toDateString() === yesterday.toDateString()) {
    date = i18n.general.yesterday;
  }
  const hours = dateTime.getHours();
  let minutes = null;
  if (+dateTime.getMinutes() < 10) {
    minutes = `0${dateTime.getMinutes()}`;
  } else {
    minutes = dateTime.getMinutes();
  }
  const time = `${hours}:${minutes}`;
  return {
    date,
    time,
  };
};

export const getTimerStringFromSeconds = (sec: number): string => {
  const minutes = Math.floor(sec / 60);
  const seconds = sec % 60;

  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(
    2,
    '0',
  )}`;
};

export const sortDates = (
  dateOne: string,
  dateTwo: string,
  sortType = 'ASC',
): number => {
  if (moment(dateOne) > moment(dateTwo)) {
    return sortType === 'ASC' ? 1 : -1;
  } else if (moment(dateOne) < moment(dateTwo)) {
    return sortType === 'ASC' ? -1 : 1;
  } else {
    return 0;
  }
};
