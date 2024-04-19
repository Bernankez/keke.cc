export interface DateCell {
  date: string;
  year: number;
  month: number;
  day: number;
  isToday: boolean;
  isCurrentMonth: boolean;
  isWeekend: boolean;
}

export const Days: Record<number, string> = {
  1: "MON",
  2: "TUE",
  3: "WED",
  4: "THU",
  5: "FRI",
  6: "SAT",
  7: "SUN",
};

export function getSequenceDays(start = 1) {
  const days = Object.values(Days);
  const index = days.indexOf(Days[start]);
  return [...days.slice(index), ...days.slice(0, index)];
}
