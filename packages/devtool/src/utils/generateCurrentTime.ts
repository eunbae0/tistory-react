import type { CurrentTime } from 'types';

export const generateCurrentTime = (): CurrentTime => {
  const now = new Date();

  const year = now.getFullYear().toString();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const hour = String(now.getHours()).padStart(2, '0');
  const minute = String(now.getMinutes()).padStart(2, '0');
  const second = String(now.getSeconds()).padStart(2, '0');

  return {
    year: year,
    month: month,
    day: day,
    hour: hour,
    minute: minute,
    second: second,
    formatted: `${year}. ${month}. ${day}. ${hour}:${minute}`,
  };
};
