import dayjs from "dayjs";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";

dayjs.extend(isSameOrBefore);

export function useEvents() {}

export function defineEvent(name: string, dates: ({ from: string; to: string } | string)[]) {
  // filter repeated dates
  const dateRanges = dates.map((date) => {
    if (typeof date === "string") {
      return { from: date, to: date };
    }
    return date;
  });
  const _dates = new Set<string>();
  for (const range of dateRanges) {
    const from = dayjs(range.from);
    const to = dayjs(range.to);
    let current = from;
    while (current.isSameOrBefore(to, "day")) {
      _dates.add(current.format("YYYY-MM-DD"));
      current = current.add(1, "day");
    }
  }
  // sort dates
  const sortDates = Array.from(_dates).sort((a, b) => {
    return dayjs(a).isBefore(dayjs(b)) ? -1 : 1;
  });
  // combine dates
  const sortRanges: { from: string; to: string }[] = [];
  let currentRange: { from: string; to: string } | null = null;
  for (const date of sortDates) {
    if (currentRange === null) {
      currentRange = { from: date, to: date };
    } else {
      const current = dayjs(date);
      const previous = dayjs(currentRange.to);
      if (current.diff(previous, "day") === 1) {
        currentRange.to = date;
      } else {
        sortRanges.push(currentRange);
        currentRange = { from: date, to: date };
      }
    }
  }
  return {
    name,
    range: sortRanges,
  };
}

// TODO
// export function calculateBoundaries(options: {
//   width: number;
//   height: number;
//   rowGap: number;
//   columnGap: number;
//   monthList: string[];
//   countPerRow: number;
// }): { left: string; top: string; right: string;bottom: string } {}
