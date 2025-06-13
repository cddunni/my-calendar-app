import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Button,
} from "@headlessui/react";
import { format } from "date-fns";
import ThemeSwitch from "../ThemeSwitch";
import { useCalendarStore } from "../../store";

interface HeaderModalProps {
  openCreateModal: () => void;
}

export default function Header({ openCreateModal }: HeaderModalProps) {
  const views = ["Month", "Week", "Day"];
  const { currentDate, view, setView, goToToday, goToNext, goToPrev } =
    useCalendarStore();

  return (
    <header className="flex justify-between w-full md:flex-row flex-col md:space-y-0 space-y-2" role="banner">
      <div className="flex space-x-6 items-center">
        <button
          onClick={goToToday}
          className="rounded-full dark:bg-[#1b1b1b] text-sm font-medium dark:text-[#E3E3E3] text-[#1f1f1f] border border-[#8d918e] w-24 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Today
        </button>

        <nav
          className="flex dark:text-[#e3e3e3] text-[#1f1f1f]"
          aria-label="Date navigation"
        >
          <Button
            className="inline-flex items-center p-1"
            onClick={goToPrev}
            aria-label="Go to previous"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="size-5 fill-current"
              aria-hidden="true"
              focusable="false"
              role="img"
            >
              <path
                fillRule="evenodd"
                d="M11.78 5.22a.75.75 0 0 1 0 1.06L8.06 10l3.72 3.72a.75.75 0 1 1-1.06 1.06l-4.25-4.25a.75.75 0 0 1 0-1.06l4.25-4.25a.75.75 0 0 1 1.06 0Z"
                clipRule="evenodd"
              />
            </svg>
          </Button>
          <Button
            className="inline-flex items-center p-1"
            onClick={goToNext}
            aria-label="Go to next"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="size-5 fill-current"
              aria-hidden="true"
              focusable="false"
              role="img"
            >
              <path
                fillRule="evenodd"
                d="M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z"
                clipRule="evenodd"
              />
            </svg>
          </Button>
        </nav>

        <h2
          className="text-[22px] dark:text-[#e3e3e3] text-[#1f1f1f] font-semibold"
          aria-live="polite"
        >
          {format(currentDate, "MMMM yyyy")}
        </h2>
      </div>

      <div className="items-center space-x-2 md:flex hidden">
        <Button
          className="inline-flex items-center gap-2 rounded-md dark:bg-[#37393c] text-[#1f1f1f] font-medium text-sm dark:text-[#e3e3e3] px-3.5 py-1.5 shadow-[0_3px_8px_rgba(0,0,0,0.24)] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          onClick={openCreateModal}
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
    </header>
  );
}
