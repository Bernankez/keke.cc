export const Days: Record<number, string> = {
  1: "MON",
  2: "TUE",
  3: "WED",
  4: "THU",
  5: "FRI",
  6: "SAT",
  7: "SUN",
};

export const getSequenceDays = (start = 1) => {
  const days = Object.values(Days);
  const index = days.indexOf(Days[start]);
  return [...days.slice(index), ...days.slice(0, index)];
};
