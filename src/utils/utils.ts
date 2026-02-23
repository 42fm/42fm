import { Duration } from "date-fns";

export const distanceFormatHMS = (current: Duration, total: Duration) => {
  return `${durationToString(current)}/${durationToString(total)}`;
};

function durationToString(duration: Duration): string {
  return [duration.hours, duration.minutes ?? 0, duration.seconds ?? 0]
    .filter((x) => x !== undefined)
    .map((x) => x?.toString().padStart(2, "0"))
    .join(":");
}
