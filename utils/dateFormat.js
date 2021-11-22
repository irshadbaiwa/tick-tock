export function getCurrentDay(moment) {
  // Takes a date instance and returns day
  const DAYS = [
    'SUN', 'MON', 'TUE',
    'WED', 'THUR', 'FRI',
    'SAT'
  ];
  return DAYS[moment.getDay()];
}

export function getCurrentDate(moment) {
  // Takes a date instance and returns date (DD/MM)
  return `${moment.getDate()}/${moment.getMonth()+1}`;
}

export function getZonalTime(UTCHours, UTCMinutes, hrDiff=0, minDiff=0) {
  const hrs = (UTCHours + hrDiff + 24) % 24;
  const mins = (UTCMinutes + minDiff + 60) % 60;
  const twoDigitHrs = String(hrs).length === 1 ? ('0'+hrs) : String(hrs);
  const twoDigitMins = String(mins).length === 1 ? ('0'+mins) : String(mins);
  return `${twoDigitHrs}:${twoDigitMins}`;
}