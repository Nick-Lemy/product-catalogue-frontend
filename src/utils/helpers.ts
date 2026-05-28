export function formatDate(date: Date, includeWeekday = false) {
  return date.toLocaleDateString("en-GB", {
    weekday: includeWeekday ? "long" : undefined,
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
