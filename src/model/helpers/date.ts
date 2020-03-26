export function toUTCDateTimeStamp(date: Date): number {
  var result = new Date(date);
  result.setUTCMonth(date.getMonth());
  result.setUTCFullYear(date.getFullYear());
  result.setUTCDate(date.getDate());
  result.setUTCHours(0, 0, 0, 0);
  return result.getTime();
}

export function getWeekdayName(date: Date) {
  var weekday = new Array(7);
  weekday[0] = "Sunday";
  weekday[1] = "Monday";
  weekday[2] = "Tuesday";
  weekday[3] = "Wednesday";
  weekday[4] = "Thursday";
  weekday[5] = "Friday";
  weekday[6] = "Saturday";

  return weekday[date.getDay()];
}
