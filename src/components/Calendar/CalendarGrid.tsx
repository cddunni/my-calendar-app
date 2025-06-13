import { useCalendarStore } from "../../store/calendarStore";
import MonthView from "./MonthView";
import WeekView from "./WeekView";
import DayView from "./DayView";

const viewComponents = {
  Month: MonthView,
  Week: WeekView,
  Day: DayView,
};

export default function CalendarGrid() {
  const { view } = useCalendarStore();

  const ViewComponent = viewComponents[view] || MonthView;

  return (
    <div className="mt-3 w-full">
      <ViewComponent />
    </div>
  );
}
