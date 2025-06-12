import {
  format,
  isSameDay,
  parse,
  differenceInMinutes,
} from "date-fns";
import { useCalendarStore } from "../../store";
import { useMemo } from "react";
import { useEventStore } from "../../store/eventStore";
import { calculateCurrentTimeOffset, filterEventsForDay, generateHoursArray, getTimeZoneAbbr } from "../../utils/calendarUtils";

export default function DayView() {
  const { currentDate } = useCalendarStore();
  const { events, setSelectedEvent } = useEventStore();

  const cellHeight = 48;
  const todayDate = new Date();
  const hours = generateHoursArray(currentDate);
  const currentTimeTop = calculateCurrentTimeOffset(cellHeight);
  const timeZoneAbbr = getTimeZoneAbbr()
  const eventsForTheDay = useMemo(
    () => filterEventsForDay(events, currentDate),
    [events, currentDate]
  );
  
  return (
    <div className="rounded-[28px] dark:bg-[#131314] bg-[#ffffff]">
      <div className="flex items-end space-x-2">
        <p className="pl-3 pr-3.5 pt-3 text-[11px] font-semibold border-r dark:border-[#333537] border-[#dde3ea] dark:text-[#e3e3e3] text-[#444746]">
          {timeZoneAbbr}
        </p>
        <div className="text-center py-2 font-semibold text-[#e3e3e3] flex flex-col items-center">
          <p className={`${isSameDay(currentDate, todayDate) ? 'dark:text-[#a8c7fa] text-[#0b57d0]' : 'text-[#444746] dark:text-[#c4c7c5]'} text-xs uppercase text-center pt-2 mb-0.5`}>
            {format(currentDate, "EEE")}
          </p>
          <p className={`${isSameDay(currentDate, todayDate) ? 'dark:bg-[#a8c7fa] bg-[#0b57d0] dark:text-[#062e6f] text-[#fff]' : 'dark:text-[#e3e3e3] text-[#1f1f1f]'} text-[26px] h-[46px] p-2 flex justify-center items-center rounded-full w-[46px] text-center`}>
            {format(currentDate, "d")}
          </p>
        </div>
      </div>
      <div className="w-full h-[calc(100vh-180px)] overflow-y-scroll text-sm">
        <div className="flex items-stretch min-h-max w-full">
          <div className="w-16 text-right pr-2 border-r dark:border-[#333537] border-[#dde3ea] flex flex-col font-semibold">
            {hours.map((hour) => (
              <div
                key={hour.toISOString()}
                className="h-12 leading-4 text-[11px] dark:text-[#e3e3e3] text-[#444746]"
              >
                {format(hour, "ha") === "12AM" ? "" : format(hour, "ha")}
              </div>
            ))}
          </div>

          <div className="flex-1 relative border-t dark:border-[#333537] border-[#dde3ea]">
            {isSameDay(currentDate, todayDate) && (
              <div
                className="absolute left-0 right-0 h-[1px] bg-red-500 z-9999"
                style={{ top: `${currentTimeTop}px` }}
              />
            )}

            {hours.map((hour) => (
              <div
                key={hour.toISOString()}
                className="first-of-type:border-t h-12 border-b dark:border-[#333537] border-[#dde3ea] cursor-pointer text-[#e3e3e3]"
              />
            ))}
            {eventsForTheDay.map((event) => {
              const start = parse(
                `${format(currentDate, "yyyy-MM-dd")} ${event.startTime}`,
                "yyyy-MM-dd HH:mm",
                new Date()
              );
              const end = parse(
                `${format(currentDate, "yyyy-MM-dd")} ${event.endTime}`,
                "yyyy-MM-dd HH:mm",
                new Date()
              );

              const top =
                start.getHours() * cellHeight +
                (start.getMinutes() / 60) * cellHeight;
              const height = Math.max(
                differenceInMinutes(end, start) * (cellHeight / 60),
                16
              );

              return (
                <div
                  key={event.id}
                  className="absolute left-0 right-6 dark:bg-[#4b99d2] bg-[#039be5] dark:text-[#131314] text-[#fff]  font-semibold text-xs px-2 py-0.5 rounded z-20 cursor-pointer text-left"
                  style={{
                    top: `${top}px`,
                    height: `${height}px`,
                  }}
                  onClick={() => setSelectedEvent(event)}
                >
                  <p
                    className={`truncate ${
                      differenceInMinutes(end, start) <= 30
                        ? "text-[11px] px-1"
                        : ""
                    }`}
                  >
                    {event.title}
                    {differenceInMinutes(end, start) <= 30 && (
                      <span>, {format(start, "h:mmaaa")}</span>
                    )}
                  </p>
                  {differenceInMinutes(end, start) >= 45 && (
                    <p className="">
                      {format(start, "h:mm")} -{" "}
                      {format(end, "h:mmaaa").toLowerCase()}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
