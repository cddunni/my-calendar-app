import { create } from "zustand";
import { addMonths, subMonths, addWeeks, addDays, subWeeks, subDays } from "date-fns";

interface CalendarState {
  currentDate: Date;
  view: "Month" | "Week" | "Day";
  setCurrentDate: (date: Date) => void;
  setView: (view: "Month" | "Week" | "Day") => void;
  goToToday: () => void;
  goToNext: () => void;
  goToPrev: () => void;
}
const getNextDate = (view: string, date: Date): Date => {
  switch (view) {
    case "Month":
      return addMonths(date, 1);
    case "Week":
      return addWeeks(date, 1);
    case "Day":
      return addDays(date, 1);
    default:
      return date;
  }
};

const getPrevDate = (view: string, date: Date): Date => {
  switch (view) {
    case "Month":
      return subMonths(date, 1);
    case "Week":
      return subWeeks(date, 1);
    case "Day":
      return subDays(date, 1);
    default:
      return date;
  }
};

const getTodayDate = (): Date => new Date();

export const useCalendarStore = create<CalendarState>((set, get) => ({
  currentDate: new Date(),
  view: "Month",
  setCurrentDate: (date) => set({ currentDate: date }),
  setView: (view) => set({ view }),
  goToNext: () => {
    const { view, currentDate } = get();
    set({ currentDate: getNextDate(view, currentDate) });
  },

  goToPrev: () => {
    const { view, currentDate } = get();
    set({ currentDate: getPrevDate(view, currentDate) });
  },

  goToToday: () => {
    set({ currentDate: getTodayDate() });
  },
}));



