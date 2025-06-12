import { parse, isSameDay, setHours, setMinutes } from "date-fns";
import type { Event } from "../types";

export const generateHoursArray = (date: Date): Date[] =>
  Array.from({ length: 24 }, (_, i) =>
    setMinutes(setHours(date, i), 0)
  );

export const calculateCurrentTimeOffset = (cellHeight: number): number => {
  const now = new Date();
  return now.getHours() * cellHeight + (now.getMinutes() / 60) * cellHeight;
};

export const getTimeZoneAbbr = (): string => {
  return new Date()
    .toLocaleTimeString("en-us", { timeZoneName: "short" })
    .split(" ")
    .pop()!;
};

export const filterEventsForDay = (events: Event[], date: Date): Event[] => {
  return events.filter((event) => {
    const start = parse(event.startDate, "yyyy-MM-dd", new Date());
    const end = parse(event.endDate, "yyyy-MM-dd", new Date());
    return (
      isSameDay(date, start) ||
      isSameDay(date, end) ||
      (date > start && date < end)
    );
  });
};
