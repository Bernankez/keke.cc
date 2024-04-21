import dayjs from "dayjs";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import type { DateCell } from ".";

dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);

export function useEvents() {}

export interface DateEvent {
  name: string;
  range: { from: string; to: string }[];
}

export function defineEvent(name: string, dates: ({ from: string; to: string } | string)[]): DateEvent {
  // format ranges
  const dateRanges = dates.map(date => typeof date === "string" ? { from: date, to: date } : date);
  // filter repeated dates
  const _dates = new Set<string>();
  for (const range of dateRanges) {
    const { from, to } = range;
    let current = dayjs(from);
    while (current.isSameOrBefore(to, "day")) {
      _dates.add(current.format("YYYY-MM-DD"));
      current = current.add(1, "day");
    }
  }
  // sort dates
  const sortDates = Array.from(_dates).sort((a, b) => dayjs(a).isBefore(dayjs(b)) ? -1 : 1);
  // combine ranges
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
  if (currentRange !== null) {
    sortRanges.push(currentRange);
  }
  return {
    name,
    range: sortRanges,
  };
}

export interface BoundaryOptions {
  offset?: number;
  width: number;
  height: number;
  lineHeight?: number;
  rowGap?: number;
  columnGap?: number;
  columnCount?: number;
  month: {
    year: number;
    month: number;
    dates: DateCell[];
  };
}

export interface Boundary {
  style: {
    left: string;
    top: string;
    height: string;
    width: string;
  };
  isStart: boolean;
  isEnd: boolean;
  startDate: string;
  endDate: string;
}

export function calculateBoundaries(event: DateEvent, options: BoundaryOptions) {
  const { width, height, lineHeight = height, month, rowGap = 0, columnGap = 0, columnCount = 7, offset = 0 } = options;
  const dates = month.dates.map(date => date.date);
  if (width === 0 || height === 0 || dates.length === 0) {
    return [];
  }
  // filter ranges
  const startDate = dayjs(`${month.year}-${month.month}`).startOf("month");
  const endDate = dayjs(`${month.year}-${month.month}`).endOf("month");
  const eventRanges = event.range.filter(r => !(dayjs(r.to).isBefore(startDate) || dayjs(r.from).isAfter(endDate))).map(r => ({
    from: dayjs(r.from).isBefore(startDate) ? startDate : dayjs(r.from),
    to: dayjs(r.to).isAfter(endDate) ? endDate : dayjs(r.to),
  }));
  const boundaries: Boundary[] = [];
  for (const range of eventRanges) {
    const startIndex = dates.indexOf(range.from.format("YYYY-MM-DD"));
    const endIndex = dates.indexOf(range.to.format("YYYY-MM-DD"));
    const startRow = Math.floor(startIndex / columnCount);
    const endRow = Math.floor(endIndex / columnCount);
    for (let r = startRow; r <= endRow; r++) {
      const startColumn = r === startRow ? startIndex % columnCount : 0;
      const endColumn = r === endRow ? endIndex % columnCount : columnCount - 1;
      const left = startColumn * (width + columnGap);
      const top = r * (height + rowGap);
      boundaries.push({
        style: {
          left: `${left}px`,
          top: `${top + offset}px`,
          height: `${lineHeight}px`,
          width: `${(endColumn - startColumn + 1) * (width + columnGap) - columnGap}px`,
        },
        isStart: r === startRow && startColumn === startIndex % columnCount,
        isEnd: r === endRow && endColumn === endIndex % columnCount,
        startDate: range.from.format("YYYY-MM-DD"),
        endDate: range.to.format("YYYY-MM-DD"),
      });
    }
  }
  return boundaries;
}

export interface EventTrack {
  name: string;
  range: {
    from: string;
    to: string;
    track: number;
  }[];
}

export interface DateTrack {
  date: string;
  events: {
    name: string;
    range: {
      from: string;
      to: string;
    };
  }[];
}

export function calculateTrack(events: DateEvent[], month: {
  year: number;
  month: number;
  dates: DateCell[];
}): EventTrack[] {
  // filter ranges
  const startDate = dayjs(`${month.year}-${month.month}`).startOf("month");
  const endDate = dayjs(`${month.year}-${month.month}`).endOf("month");
  const dateTracks = Array.from({ length: endDate.diff(startDate, "day") + 1 }).map<DateTrack>((_, i) => {
    return {
      date: startDate.add(i, "day").format("YYYY-MM-DD"),
      events: [],
    };
  });
  const filteredEvents = events.map((event) => {
    const eventRanges = event.range.filter(r => !(dayjs(r.to).isBefore(startDate) || dayjs(r.from).isAfter(endDate))).map(r => ({
      from: dayjs(r.from).isBefore(startDate) ? startDate : dayjs(r.from),
      to: dayjs(r.to).isAfter(endDate) ? endDate : dayjs(r.to),
    }));
    return {
      name: event.name,
      range: eventRanges,
    };
  });
  for (const event of filteredEvents) {
    for (const range of event.range) {
      const startIndex = dateTracks.findIndex(d => d.date === range.from.format("YYYY-MM-DD"));
      const endIndex = dateTracks.findIndex(d => d.date === range.to.format("YYYY-MM-DD"));
      for (let i = startIndex; i <= endIndex; i++) {
        dateTracks[i].events.push({
          name: event.name,
          range: {
            from: range.from.format("YYYY-MM-DD"),
            to: range.to.format("YYYY-MM-DD"),
          },
        });
      }
    }
  }
  const _eventTracks: EventTrack[] = [];
  for (const event of filteredEvents) {
    for (const r of event.range) {
      const start = r.from;
      const end = r.to;
      const diff = end.diff(start, "day") + 1;
      for (let i = 0; i < diff; i++) {
        const date = start.add(i, "day").format("YYYY-MM-DD");
        const dateTrack = dateTracks.find(d => d.date === date);
        const _track = dateTrack?.events.findIndex(e => e.name === event.name && e.range.from === r.from.format("YYYY-MM-DD") && e.range.to === r.to.format("YYYY-MM-DD"));
        // TODO
        // find max track
      }
    }
  }
  return [];
}

export function resolveTrack(tracks: Set<number>, track?: number, max = 100) {
  if (isDefined(track) && !tracks.has(track)) {
    return track;
  }
  for (let i = 0; i < max; i++) {
    if (!tracks.has(i)) {
      return i;
    }
  }
  return max;
}
