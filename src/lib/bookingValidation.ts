/** Require an explicit timezone; never interpret an appointment in browser local time. */
export function isBookingDateKey(value: string): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const date = new Date(`${value}T00:00:00.000Z`);
  return Number.isFinite(date.getTime()) && date.toISOString().slice(0, 10) === value;
}

export function isBookingTimestamp(value: string): boolean {
  const match = /^(\d{4}-\d{2}-\d{2})T(\d{2}):(\d{2}):(\d{2})(?:\.\d+)?(?:Z|[+-]\d{2}:\d{2})$/.exec(value);
  if (!match || !isBookingDateKey(match[1])) return false;
  if (Number(match[2]) > 23 || Number(match[3]) > 59 || Number(match[4]) > 59) return false;
  return Number.isFinite(Date.parse(value));
}

export function hasBookingDetails(details: {
  startAt: string;
  teamMemberId: string;
  locationId: string;
  serviceVariationIds: string[];
}): boolean {
  return isBookingTimestamp(details.startAt)
    && !!details.teamMemberId.trim()
    && !!details.locationId.trim()
    && details.serviceVariationIds.length > 0
    && details.serviceVariationIds.every((id) => !!id.trim());
}
