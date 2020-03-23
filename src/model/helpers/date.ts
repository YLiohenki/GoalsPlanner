export function getDateUTCTimestamp(day: Date): number {
    return Date.UTC(day.getUTCFullYear(), day.getUTCMonth(), day.getUTCDate());
}