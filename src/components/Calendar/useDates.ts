import type { MaybeRefOrGetter } from "vue";
import dayjs from "dayjs";
import type { DateCell } from ".";

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
  const firstDay = dayjs(`${toValue(year)}-${toValue(month)}-01`).startOf("week").add(start % 7, "day");
  const lastDay = dayjs(`${toValue(year)}-${toValue(month)}-01`).endOf("month").endOf("week").add(start % 7, "day");
  const days = lastDay.diff(firstDay, "day") + 1;
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
