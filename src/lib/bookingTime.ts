/** Booking dates and times are displayed in UTC, independent of the browser. */
export function utcDateKey(value: string | Date): string {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? "" : date.toISOString().slice(0, 10);
}

export function formatUtcTime(value: string | Date): string {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return new Intl.DateTimeFormat("en-US", {
    timeZone: "UTC", hour: "2-digit", minute: "2-digit", hour12: true,
  }).format(date);
}

export function formatUtcDate(value: string | Date, weekday = false): string {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return new Intl.DateTimeFormat("en-US", {
    timeZone: "UTC", year: "numeric", month: "long", day: "numeric",
    ...(weekday ? { weekday: "long" as const } : {}),
  }).format(date);
}

export function utcDayOffset(value: Date, days: number): Date {
  return new Date(Date.UTC(value.getUTCFullYear(), value.getUTCMonth(), value.getUTCDate() + days));
}
