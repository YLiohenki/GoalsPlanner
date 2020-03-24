export function toUTCDateTimeStamp(date: Date): number {
    var result = new Date(date);
    result.setUTCMonth(date.getMonth());
    result.setUTCFullYear(date.getFullYear());
    result.setUTCDate(date.getDate());
    result.setUTCHours(0, 0, 0, 0);
    return result.getTime();
}