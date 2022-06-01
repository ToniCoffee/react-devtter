import { useState, useEffect } from 'react';

const DATE_UNITS = [
  ['day', 86400],
  ['hour', 3600],
  ['minute', 60],
  ['second', 1],
];

const getDateDiffs = (timeStamp) => {
  const date = Date.now();
  const elapsedTime = (timeStamp - date) / 1000;

  for(const [unit, secondsPerUnit] of DATE_UNITS) {
    if(Math.abs(elapsedTime) > secondsPerUnit || unit === 'second') {
      const value = Math.floor(elapsedTime / secondsPerUnit);
      return { value, unit};
    }
  }
};

/* export default function useTimeAgo(timeStamp) {
	const { value, unit } = getDateDiffs(timeStamp);
	const rtf = new Intl.RelativeTimeFormat('es', { style: 'short' });
	return rtf.format(value, unit);
} */

export default function useTimeAgo(timeStamp) {
  const [timeago, setTimeago] = useState(() => getDateDiffs(timeStamp));

  useEffect(() => {
    const interval = setInterval(() => {
      const newTimeago = getDateDiffs(timeStamp);
      setTimeago(newTimeago);
    }, 5000);

    return () => clearInterval(interval);
  }, [timeStamp]);

  const rtf = new Intl.RelativeTimeFormat('es', { style: 'short' });
  const { value, unit } = timeago;
  return rtf.format(value, unit);
}