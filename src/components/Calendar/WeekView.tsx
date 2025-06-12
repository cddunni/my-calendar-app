import {
  format,
  startOfWeek,
  addDays,
  setHours,
  setMinutes,
  isSameDay,
  parse,
  differenceInMinutes,
  isWithinInterval,
} from "date-fns";

import { useCalendarStore } from "../../store";
import { useEventStore } from "../../store/eventStore";
import { useEffect, useState } from "react";

export default function WeekView() {
  const { currentDate } = useCalendarStore();
  const { events, setSelectedEvent } = useEventStore();

  const start = startOfWeek(currentDate, { weekStartsOn: 0 });
  const days = Array.from({ length: 7 }, (_, i) => addDays(start, i));
  const todayDate = new Date();
  const hours = Array.from({ length: 24 }, (_, i) =>
    setMinutes(setHours(new Date(), i), 0)
  );
  const timeZoneAbbr = todayDate
    .toLocaleTimeString("en-us", { timeZoneName: "short" })
    .split(" ")
    .pop();
    const [now, setNow] = useState(new Date());

    useEffect(() => {
      const interval = setInterval(() => setNow(new Date()), 60000);
      return () => clearInterval(interval);
    }, []);
    
  return (
    <div className="rounded-[28px] dark:bg-[#131314] bg-[#ffffff]">
      <div className="flex items-end">
        <p className="pl-3 pr-3.5 pt-3 text-[11px] font-semibold border-r dark:border-[#333537] border-[#dde3ea] dark:text-[#e3e3e3] text-[#444746]">
          {timeZoneAbbr}
        </p>
        <div className="grid grid-cols-7 w-full" role="grid">
          {days.map((day) => {
            const isToday = isSameDay(day, new Date());

            return (
              <div
                key={day.toISOString()}
                className="text-center py-2 font-semibold text-[#e3e3e3] flex flex-col items-center"
              >
                <p
                  className={`text-xs uppercase text-center font-medium pt-2 mb-4 ${
                    isToday
                      ? "dark:text-[#a8c7fa] text-[#0b57d0]"
                      : "dark:text-[#c4c7c5] text-[#444746]"
                  }`}
                >
                  {format(day, "EEE")}
                </p>
                <p
                  className={`text-[26px] font-semibold ${
                    isToday
                      ? "dark:text-[#062e6f] text-[#fff] dark:bg-[#a8c7fa] bg-[#0b57d0] h-[46px] p-2 flex justify-center items-center rounded-full w-[46px] text-center"
                      : "dark:text-[#c4c7c5] text-[#444746]"
                  }`}
                >
                  {format(day, "d")}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      <div className="w-full h-[calc(100vh-180px)] overflow-y-scroll text-sm">
        <div className="flex items-stretch min-h-max w-full">
          <div className="w-16 border-r dark:border-[#333537] border-[#dde3ea] text-right pr-2 flex flex-col font-semibold">
            {hours.map((hour) => (
              <div
                key={hour.toISOString()}
                className="h-12 leading-4 text-[11px] dark:text-[#e3e3e3] text-[#444746]"
              >
                {format(hour, "ha") === "12AM" ? "" : format(hour, "ha")}
              </div>
            ))}
          </div>

          <div className="flex-1 grid grid-cols-7 relative" role="grid">
            {days.map((day) => {
              const isToday = isSameDay(day, new Date());
              return (
                <div
                  key={day.toISOString()}
                  className="flex-1 border-r dark:border-[#333537] border-[#dde3ea] relative"
                >
                  {isToday && (
                    <div
                      className="absolute left-0 right-0 h-[1px] bg-red-500 z-10"
                      style={{
                        top: `${
                          now.getHours() * 48 +
                          (now.getMinutes() / 60) * 48
                        }px`,
                      }}
                    />
                  )}
                  {hours.map((hour) => (
                    <div
                      key={hour.toISOString()}
                      className="h-12 border-b dark:border-[#333537] border-[#dde3ea] relative"
                    />
                  ))}

                  {events
                    .filter((event) => {
                      const eventStart = parse(
                        event.startDate,
                        "yyyy-MM-dd",
                        new Date()
                      );
                      const eventEnd = parse(
                        event.endDate,
                        "yyyy-MM-dd",
                        new Date()
                      );
                      return isWithinInterval(day, {
                        start: eventStart,
                        end: eventEnd,
                      });
                    })
                    .map((event) => {
                      const start = parse(
                        `${format(day, "yyyy-MM-dd")} ${event.startTime}`,
                        "yyyy-MM-dd HH:mm",
                        new Date()
                      );
                      const end = parse(
                        `${format(day, "yyyy-MM-dd")} ${event.endTime}`,
                        "yyyy-MM-dd HH:mm",
                        new Date()
                      );
                      const durationInMinutes =
                        (end.getTime() - start.getTime()) / 60000;
                      const topOffset =
                        (start.getHours() * 60 + start.getMinutes()) *
                        (48 / 60);
                      const height = Math.max(
                        durationInMinutes * (48 / 60),
                        16
                      );

                      return (
                        <div
                          aria-label={`Event: ${event.title} at ${event.startTime}`}
                          key={`${event.id}-${day.toISOString()}`}
                          className={`absolute left-1 right-1 dark:bg-[#4b99d2] bg-[#039be5] dark:text-[#131314] text-[#fff] font-semibold text-xs rounded  z-20 text-left cursor-pointer ${
                            differenceInMinutes(end, start) >= 30 ? "p-1" : ""
                          }`}
                          style={{
                            top: `${topOffset}px`,
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
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
