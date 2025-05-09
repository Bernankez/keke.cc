import { nanoid } from "nanoid";

const Backmoji = defineCalendarEvent({
  id: nanoid(6),
  color: resolveColor()[0],
  desc: "Backmoji",
}, [
  {
    from: "2024-03-20",
    to: "2024-04-18",
  },
]);

const keke = defineCalendarEvent({
  id: nanoid(6),
  color: resolveColor()[0],
  desc: "keke.cc",
}, [
  {
    from: "2024-01-30",
    to: "2024-03-06",
    desc: "keke.cc - DayGram",
  },
  {
    from: "2024-04-18",
    to: "2024-04-22",
    desc: "keke.cc - DayGram",
  },
]);

const themeGenerator = defineCalendarEvent({
  id: nanoid(6),
  color: resolveColor()[0],
  desc: "@bernankez/theme-generator",
}, [
  {
    from: "2024-04-24",
    to: "2024-04-26",
  },
]);

export const events = [Backmoji, keke, themeGenerator];
