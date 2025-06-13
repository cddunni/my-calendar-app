import { DayPicker } from "react-day-picker";
import "./App.css";
import { Header, ThemeSwitch } from "./components";
import CalendarGrid from "./components/Calendar/CalendarGrid";
import "react-day-picker/dist/style.css";
import { useCalendarStore } from "./store";
import { useEffect, useState } from "react";
import EventDetails from "./components/EventDetails";
import CreateEvent from "./components/CreateEvent";
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Button,
} from "@headlessui/react";

const views = ["Month", "Week", "Day"];

function App() {
  const { currentDate, setCurrentDate, setView, view } = useCalendarStore();
  const [open, setOpen] = useState(false);
  const [showSideBar, setShowSidebar] = useState(true);

  useEffect(() => {
    if (window.innerWidth <= 768) {
      setShowSidebar(false);
    }
  }, [setView, view]);

  return (
    <div className="app text-right p-4 space-x-2 dark:bg-[#1c1c1c] bg-[#f8fafd]">
      <div className="text-center items-center flex w-full">
        <div className="flex lg:min-w-[250px] w-fit items-center space-x-2">
          <button
            className="rounded-full dark:text-[#c4c7c5] text-[#444746] dark:hover:bg-[#e8eaed14] hover:bg-[#3c40431a] hover:text-[#444746] dark:hover:text-[#ffffff] focus:ring-white/40 !h-10 w-10 flex items-center justify-center p-2"
            aria-label="Sidebar menu"
            onClick={() => setShowSidebar(!showSideBar)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75"
              />
            </svg>
          </button>
          <div className="lg:flex space-x-2 items-center hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="#4285F4"
              width="48"
              height="48"
            >
              <rect
                x="3"
                y="5"
                width="18"
                height="16"
                rx="2"
                ry="2"
                fill="#4285F4"
              />
              <rect x="3" y="8" width="18" height="2" fill="#FFFFFF" />
              <line
                x1="7"
                y1="2"
                x2="7"
                y2="6"
                stroke="#4285F4"
                stroke-width="2"
              />
              <line
                x1="17"
                y1="2"
                x2="17"
                y2="6"
                stroke="#4285F4"
                stroke-width="2"
              />
              <text
                x="12"
                y="15"
                text-anchor="middle"
                font-size="7"
                fill="white"
                font-family="Arial, sans-serif"
                font-weight="bold"
              >
                31
              </text>
            </svg>
            <p className="font-medium text-2xl text-[#1f1f1f] dark:text-[#e3e3e3] ">
              Calendar
            </p>
          </div>
        </div>
        <Header openCreateModal={() => setOpen(true)} />
      </div>
      <main className="w-full lg:flex block">
        {showSideBar && (
          <div>
            <div className=" items-center space-x-2 md:hidden flex">
              <Button
                className="inline-flex items-center gap-2 rounded-md dark:bg-[#37393c] text-[#1f1f1f] font-medium text-sm dark:text-[#e3e3e3] px-3.5 py-1.5 shadow-[0_3px_8px_rgba(0,0,0,0.24)] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                onClick={() => setOpen(true)}
                aria-label="Create a new event"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="size-5"
                  aria-hidden="true"
                  focusable="false"
                  role="img"
                >
                  <path d="M10.75 4.75a.75.75 0 0 0-1.5 0v4.5h-4.5a.75.75 0 0 0 0 1.5h4.5v4.5a.75.75 0 0 0 1.5 0v-4.5h4.5a.75.75 0 0 0 0-1.5h-4.5v-4.5Z" />
                </svg>
                Create Event
              </Button>

              <Menu as="div" className="relative">
                <MenuButton
                  className="flex items-center gap-2 rounded-full dark:bg-[#1b1b1b] px-4 py-0.5 text-sm font-medium dark:text-[#E3E3E3] text-[#1f1f1f] w-24 border border-[#8d918e] text-center focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  aria-label="Select calendar view"
                >
                  {view}
                  <span aria-hidden="true">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="size-5"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                </MenuButton>

                <MenuItems
                  transition
                  anchor="bottom end"
                  className="w-52 origin-top-right rounded-md bg-[#1b1b1b] py-1.5 text-sm/6 text-[#E3E3E3] transition duration-100 ease-out mt-1 z-10"
                >
                  {views.map((v) => (
                    <MenuItem key={v}>
                      {({ active }) => (
                        <button
                          onClick={() => setView(v as "Month" | "Week" | "Day")}
                          className={`text-left w-full items-center gap-2 px-3 py-1.5 flex justify-between ${
                            active ? "bg-[#37393c]" : ""
                          }`}
                          role="menuitem"
                        >
                          <span>{v}</span>
                          <span aria-hidden="true">{v.charAt(0)}</span>
                        </button>
                      )}
                    </MenuItem>
                  ))}
                </MenuItems>
              </Menu>

              <ThemeSwitch />
            </div>
            <DayPicker
              selected={currentDate}
              onSelect={(date) => date && setCurrentDate(date)}
              mode="single"
              className="my-calendar lg:min-w-[250px]"
            />
          </div>
        )}
        <CalendarGrid />
      </main>
      <CreateEvent isOpen={open} onClose={() => setOpen(false)} />
      <EventDetails />
    </div>
  );
}

export default App;
