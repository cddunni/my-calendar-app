import {
  eachDayOfInterval,
  endOfMonth,
  startOfMonth,
  startOfWeek,
  endOfWeek,
  format,
  isSameDay,
  isWithinInterval,
  parseISO,
  differenceInCalendarWeeks,
} from "date-fns";
import { useCalendarStore } from "../../store/calendarStore";
import { daysOfTheWeek } from "../../utils/data";
import { useEventStore } from "../../store/eventStore";

export default function MonthView() {
  const { currentDate } = useCalendarStore();
  const { events, setSelectedEvent } = useEventStore();
  const start = startOfWeek(startOfMonth(currentDate));
  const end = endOfWeek(endOfMonth(currentDate));
  const days = eachDayOfInterval({ start, end });
  const numberOfWeeks = differenceInCalendarWeeks(end, start) + 1;

  return (
    <div className="dark:bg-[#131314] bg-[#ffffff] rounded-[28px] border-l dark:border-[#333537] border-[#dde3ea] min-h-[calc(100vh-90px)] flex flex-col">
      <div className="grid grid-cols-7" role="grid">
        {daysOfTheWeek.map((day) => (
          <p
            key={day}
            className="text-xs uppercase text-center font-semibold border-r dark:border-[#333537] border-[#dde3ea] dark:text-[#c4c7c5] text-[#1f1f1f] pt-2 last-of-type:border-0"
          >
            {day}
          </p>
        ))}
      </div>

      <div
        className="flex-1 grid grid-cols-7"
        role="grid"
        style={{ gridTemplateRows: `repeat(${numberOfWeeks}, 1fr)` }}
      >
        {days.map((day) => {
          const isFirstOfMonth = format(day, "d") === "1";
          const isToday = isSameDay(day, new Date());
          const label = isFirstOfMonth
            ? `${format(day, "MMM d")}`
            : format(day, "d");

          const eventsForDay = events.filter((event) => {
            const start = parseISO(event.startDate);
            const end = parseISO(event.endDate);
            return isWithinInterval(day, { start, end });
          });

          return (
            <div
              key={day.toISOString()}
              className="p-2 text-xs flex flex-col gap-1 border-r border-b dark:border-[#333537] border-[#dde3ea]"
            >
              <h2
                className={`w-fit self-center font-bold ${
                  isToday
                    ? "dark:text-[#062e6f] text-[#fff] dark:bg-[#a8c7fa] bg-[#0b57d0] h-6 w-6 rounded-full flex items-center justify-center px-[7px] text-center"
                    : "dark:text-[#e3e3e3] text-[#1f1f1f]"
                }`}
              >
                {label}
              </h2>

              <div className="dark:text-[#e3e3e3] text-[#1f1f1f] font-semibold text-left max-h-20 overflow-y-scroll">
                {eventsForDay.map((event) => (
                  <div
                    key={event.id}
                    className="text-xs p-1 rounded flex items-center space-x-1 cursor-pointer"
                    onClick={() => setSelectedEvent(event)}
                    aria-label={`Event: ${event.title} at ${event.startTime}`}
                  >
                    <div className="bg-[#4b99d2] h-2 w-2 rounded-full"></div>
                    <p className="whitespace-nowrap overflow-x-scroll scrollbar-hide">
                      <span className="mr-1">{event.startTime}</span>
                      <span>{event.title}</span>
                    </p>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
