import type { MaybeRefOrGetter } from "vue";
import type { DateCell } from ".";
import dayjs from "dayjs";

export interface UseDaysOptions {
  start?: number;
}

export function useDates(year: MaybeRefOrGetter<number>, month: MaybeRefOrGetter<number>, options: UseDaysOptions = {}) {
  const { start = 1 } = options;

  const dates = computed(() => {
    return generateDayCells(toValue(year), toValue(month), start);
  });

  return {
    dates,
  };
};

export function generateDayCells(year: number, month: number, start: number): DateCell[] {
  const firstDay = dayjs(`${year}-${month}-01`).subtract(1, "month").endOf("month").startOf("week").add(start % 7, "day");
  const lastDay = dayjs(`${year}-${month}-01`).endOf("month").endOf("week").add(start % 7, "day");
  // fill to 6 lines
  let days = lastDay.diff(firstDay, "day") + 1;
  if (days <= 35) {
    lastDay.add(7, "day");
    days += 7;
  }
  const today = dayjs();
  const dateCells = Array.from({ length: days }, (_, index) => {
    const date = firstDay.add(index, "day");
    return {
      date: date.format("YYYY-MM-DD"),
      year: date.year(),
      month: date.month() + 1,
      day: date.date(),
      isToday: date.isSame(today, "day"),
      isCurrentMonth: date.isSame(`${year}-${month}`, "month"),
      isWeekend: date.day() === 0 || date.day() === 6,
    };
  });
  return dateCells;
}

export interface Month {
  year: number;
  month: number;
  dates: DateCell[];
}

export function generateMonthList(start: string, end: string, startDay: number): Month[] {
  const startDate = dayjs(start);
  const endDate = dayjs(end);
  const count = endDate.diff(startDate, "month");
  const months = Array.from({ length: count }, (_, i) => {
    const date = startDate.add(i, "month");
    const { dates } = useDates(date.year(), date.month() + 1, { start: startDay });
    return {
      year: date.year(),
      month: date.month() + 1,
      dates: dates.value,
    };
  });
  return [...months];
}
