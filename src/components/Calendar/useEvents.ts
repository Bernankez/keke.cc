import type { Month } from "./useDates";
import { n } from "@bernankez/utils";
import dayjs from "dayjs";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import { nanoid } from "nanoid";

dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);

const colors = n([
  "#2196F3",
  "#FF9800",
  "#03A9F4",
  "#FFC107",
  "#FF5722",
  "#E91E63",
  "#673AB7",
  "#3F51B5",
  "#00BCD4",
  "#009688",
  "#4CAF50",
  "#8BC34A",
  "#CDDC39",
  "#FFEB3B",
  "#795548",
  "#9E9E9E",
  "#607D8B",
]);

type Color = typeof colors[number];

const _colors = [...colors];

export function resolveColor(color?: Color) {
  if (color) {
    const index = _colors.indexOf(color);
    if (index !== -1) {
      _colors.splice(index, 1);
    }
    return n([color, () => {
      _colors.push(color);
    }]);
  }
  const newColor = _colors.shift();
  if (!newColor) {
    throw new Error("No more colors available.");
  }
  return n([newColor, () => {
    _colors.push(newColor);
  }]);
}

export function resolveColors() {
  const _colors = [...colors];

  function use() {
    return _colors.shift() ?? "#000000";
  }

  function release(color: Color) {
    _colors.push(color);
  }

  return {
    use,
    release,
  };
}

export interface CalendarEvent<R = CalendarEventRange> {
  id: string;
  desc: string;
  color?: string;
  ranges: R[];
}

export interface CalendarEventRange {
  id: string;
  desc?: string;
  dates: string[];
}

export interface CalendarEventRangeWithTrack extends CalendarEventRange {
  track: number;
}

export function defineCalendarEvent(options: Omit<CalendarEvent, "ranges">, dates: ({ from: string; to: string; desc?: string } | { desc?: string; date: string } | string)[]): CalendarEvent {
  const _dates = new Set<string>();
  const descMap = new Map<string, string>();
  for (const date of dates) {
    if (typeof date === "string") {
      _dates.add(date);
    }
    else if ("from" in date) {
      let current = dayjs(date.from);
      while (current.isSameOrBefore(date.to, "day")) {
        _dates.add(current.format("YYYY-MM-DD"));
        if (date.desc) {
          descMap.set(current.format("YYYY-MM-DD"), date.desc);
        }
        current = current.add(1, "day");
      }
    }
    else {
      if (date.desc) {
        descMap.set(date.date, date.desc);
      }
      _dates.add(date.date);
    }
  }
  const ranges = datesToRanges([..._dates], {
    resolveDesc: date => descMap.get(date),
  });
  return {
    ...options,
    ranges,
  };
}

export interface DatesToRangesOptions {
  resolveId?: (date: string) => string;
  resolveDesc?: (date: string) => string | undefined;
}

function datesToRanges(dates: string[], options?: DatesToRangesOptions): CalendarEventRange[] {
  const { resolveId, resolveDesc } = options || {};
  const _resolveId = resolveId ?? (() => nanoid(6));
  // sort dates
  const sortedDates = Array.from(dates).sort((a, b) => dayjs(a).isBefore(dayjs(b)) ? -1 : 1);
  const eventDates: CalendarEventRange[] = [];
  let current: CalendarEventRange | null = null;
  for (const date of sortedDates) {
    if (!current) {
      current = {
        id: _resolveId(date),
        desc: resolveDesc?.(date),
        dates: [date],
      };
    }
    else {
      const previous = dayjs(current.dates.at(-1)!);
      const currentDay = dayjs(date);
      if (currentDay.diff(previous, "day") === 1) {
        current.dates.push(date);
      }
      else {
        eventDates.push(current);
        current = {
          id: _resolveId(date),
          desc: resolveDesc?.(date),
          dates: [date],
        };
      }
    }
  }
  if (current) {
    eventDates.push(current);
  }
  return eventDates;
}

export function resolveEventTracks(events: CalendarEvent[], start: string, end: string): CalendarEvent<CalendarEventRangeWithTrack>[] {
  const dates: {
    date: string;
    events: string[];
  }[] = [];
  const startDate = dayjs(start);
  const endDate = dayjs(end);
  let current = startDate;
  while (current.isSameOrBefore(endDate, "day")) {
    dates.push({
      date: current.format("YYYY-MM-DD"),
      events: [],
    });
    current = current.add(1, "day");
  }
  for (const event of events) {
    for (const range of event.ranges) {
      for (const date of range.dates) {
        const current = dates.find(d => d.date === date);
        if (current) {
          current.events.push(event.id);
        }
      }
    }
  }
  const filteredEvents = events.map(event => ({
    ...event,
    ranges: event.ranges.filter((range) => {
      const start = dayjs(range.dates[0]);
      const end = dayjs(range.dates.at(-1)!);
      return !(end.isBefore(startDate) || start.isAfter(endDate));
    }).map((range) => {
      const _dates = range.dates.filter((date) => {
        return dayjs(date).isSameOrAfter(startDate) && dayjs(date).isSameOrBefore(endDate);
      });
      return {
        ...range,
        dates: _dates,
      };
    }),
  }));
  const eventWithTrack = filteredEvents.map(event => ({
    ...event,
    ranges: event.ranges.map((range) => {
      const start = range.dates[0];
      const end = range.dates.at(-1)!;
      const startIndex = dates.findIndex(d => d.date === start);
      const endIndex = dates.findIndex(d => d.date === end);
      const tracks: number[] = [];
      for (let i = startIndex; i <= endIndex; i++) {
        const date = dates[i];
        const track = date.events.findIndex(e => e === event.id);
        if (isDefined(track)) {
          tracks.push(track);
        }
      }
      const maxTrack = Math.max(...tracks);
      return {
        ...range,
        track: maxTrack,
      };
    }),
  }));
  return eventWithTrack;
}

export interface ResolveEventBoundaryOptions {
  start: string;
  end: string;
  month: Month;
  offset: number;
  width: number;
  height: number;
  lineHeight: number;
  rowGap?: number;
  columnGap?: number;
  columnCount?: number;
}

export interface EventBoundary {
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

export interface CalendarEventRangeWithBoundary extends CalendarEventRangeWithTrack {
  boundaries: EventBoundary[];
}

export function resolveEventBoundaries(events: CalendarEvent<CalendarEventRangeWithTrack>[], options: ResolveEventBoundaryOptions): CalendarEvent<CalendarEventRangeWithBoundary>[] {
  const { start, end, month, offset, width, height, lineHeight, rowGap = 0, columnGap = 0, columnCount = 7 } = options;
  const dates = month.dates.map(date => date.date);
  if (width === 0 || height === 0 || dates.length === 0) {
    return [];
  }
  const startDate = dayjs(start);
  const endDate = dayjs(end);
  const eventRanges = events.map((event) => {
    const ranges = event.ranges.filter((range) => {
      const start = dayjs(range.dates[0]);
      const end = dayjs(range.dates.at(-1)!);
      return !(end.isBefore(startDate) || start.isAfter(endDate));
    });
    return {
      ...event,
      ranges,
    };
  });
  const eventWithBoundaries = eventRanges.map<CalendarEvent<CalendarEventRangeWithBoundary>>((event) => {
    return {
      ...event,
      ranges: event.ranges.map<CalendarEventRangeWithBoundary>((range) => {
        const boundaries: EventBoundary[] = [];
        const startIndex = dates.indexOf(range.dates[0]);
        const endIndex = dates.indexOf(range.dates.at(-1)!);
        const startRow = Math.floor(startIndex / columnCount);
        const endRow = Math.floor(endIndex / columnCount);
        for (let r = startRow; r <= endRow; r++) {
          const startColumn = r === startRow ? startIndex % columnCount : 0;
          const endColumn = r === endRow ? endIndex % columnCount : columnCount - 1;
          const left = startColumn * (width + columnGap);
          const top = r * (height + rowGap) + offset + lineHeight * range.track;
          boundaries.push({
            style: {
              left: `${left}px`,
              top: `${top}px`,
              height: `${lineHeight}px`,
              width: `${(endColumn - startColumn + 1) * (width + columnGap) - columnGap}px`,
            },
            isStart: r === startRow && startColumn === startIndex % columnCount,
            isEnd: r === endRow && endColumn === endIndex % columnCount,
            startDate: range.dates[0],
            endDate: range.dates.at(-1)!,
          });
        }
        return {
          ...range,
          boundaries,
        };
      }),
    };
  });
  return eventWithBoundaries;
}

export interface DateEvent {
  name: string;
  range: { from: string; to: string }[];
}
