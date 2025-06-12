import { Fragment } from "react";
import { useEventStore } from "../../store/eventStore";
import {
  Dialog,
  DialogPanel,
  Transition,
  TransitionChild,
  DialogTitle
} from "@headlessui/react";
import { format, differenceInDays, parseISO, parse } from "date-fns";

export default function EventDetails() {
  const { selectedEvent, clearSelectedEvent } = useEventStore();
  if (!selectedEvent || !selectedEvent.startDate) return null;

  const start = parseISO(selectedEvent.startDate);
  const end = parseISO(selectedEvent.endDate);
  const isSameDay = differenceInDays(end, start) === 0;
  const startTime = parse(
    `${format(selectedEvent.startDate, "yyyy-MM-dd")} ${selectedEvent.startTime}`,
    "yyyy-MM-dd HH:mm",
    new Date()
  );
  const endTime = parse(
    `${format(selectedEvent.endDate, "yyyy-MM-dd")} ${selectedEvent.endTime}`,
    "yyyy-MM-dd HH:mm",
    new Date()
  );

  return (
    <Transition appear show={!!selectedEvent} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={clearSelectedEvent}>
        <TransitionChild
          as={Fragment}
          enter="ease-out duration-200"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-150"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-opacity-50" />
        </TransitionChild>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <TransitionChild
              as={Fragment}
              enter="ease-out duration-200"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-150"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <DialogPanel className="w-full max-w-md transform overflow-hidden rounded-[28px] dark:bg-[#1e1f20] bg-[#f0f4f9] text-[#1f1f1f] dark:text-white p-6 text-left align-middle dark:shadow-xl transition-all shadow-[0_3px_8px_rgba(0,0,0,0.24)] font-medium ">
                <div className="flex justify-between items-center mb-4">
                  <DialogTitle className="text-xl font-semibold">
                    Event Details
                  </DialogTitle>
                  <button
                    className="rounded-full dark:text-[#c4c7c5] text-[#444746] hover:bg-[#2f3133] hover:text-white focus:outline-none focus:ring-2 focus:ring-white/40 !h-8 w-8 flex items-center justify-center"
                    onClick={clearSelectedEvent}
                    aria-label="Close"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="h-5 w-5"
                    >
                      <path d="M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z" />
                    </svg>
                  </button>
                </div>

                <div className="flex space-x-4">
                  <div className="w-3.5 h-3.5 rounded-full bg-[#4b99d1] mt-1.5" />
                  <div className="text-[#1f1f1f] dark:text-gray-100">
                    <p className="text-lg font-semibold">{selectedEvent.title}</p>

                    <div className="mt-2 flex items-center space-x-2 text-sm">
                      <svg className="w-4 h-4 dark:text-gray-400 text-[#1f1f1f]" fill="currentColor" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path d="M8 7V3M16 7V3M4 11h16M4 19h16M4 15h16" />
                      </svg>
                      <span>
                        {isSameDay
                          ? format(start, "PP")
                          : `${format(start, "PPP")} – ${format(end, "PPP")}`}
                      </span>
                    </div>

                    <div className="mt-1 flex items-center space-x-2 text-sm dark:text-gray-300 text-[#1f1f1f]">
                      <svg className="w-4 h-4 dark:text-gray-400 text-[#1f1f1f]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path d="M12 6v6l4 2" />
                        <circle cx="12" cy="12" r="10" />
                      </svg>
                      <span>
                        {format(startTime, "h:mm a")} – {format(endTime, "h:mm a")}
                      </span>
                    </div>

                    {selectedEvent.description && (
                      <p className="mt-4 text-sm dark:text-gray-400 text-[#1f1f1f] leading-relaxed">
                        {selectedEvent.description}
                      </p>
                    )}
                  </div>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
