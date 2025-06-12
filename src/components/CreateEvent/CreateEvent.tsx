import {
  Dialog,
  Transition,
  TransitionChild,
  DialogTitle,
  DialogPanel,
} from "@headlessui/react";
import { Fragment, useState } from "react";
import type { CreateEventType } from "../../types";
import { generateTimeOptions } from "../../utils/generators";
import { useEventStore } from "../../store/eventStore";
import { v4 as uuidv4 } from "uuid";

interface CreateEventModalProps {
  isOpen: boolean;
  onClose: () => void;
}
const initialFormData = {
  title: "",
  description: "",
  startTime: "",
  endTime: "",
  startDate: "",
  endDate: "",
};

export default function CreateEventModal({
  isOpen,
  onClose,
}: CreateEventModalProps) {
  const [formData, setFormData] = useState<CreateEventType>({
    ...initialFormData,
  });

  const timeOptions = generateTimeOptions();

  const handleOnChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const resetForm = () => setFormData({ ...initialFormData });
  const handleClose = () => {
    resetForm();
    onClose();
  };
  const handleSubmit = () => {
    useEventStore.getState().addEvent({ id: uuidv4(), ...formData });
    handleClose();
  };
  const isFormValid =
    !formData.title ||
    !formData.startDate ||
    !formData.endDate ||
    !formData.startTime ||
    !formData.endTime;

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={handleClose}>
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
                <div className="flex justify-end">
                  <button
                    className="rounded-full dark:text-[#c4c7c5] text-[#444746] hover:bg-[#2f3133] hover:text-white focus:outline-none focus:ring-2 focus:ring-white/40 !h-8 w-8 flex items-center justify-center"
                    onClick={handleClose}
                    aria-label="Close"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="size-5"
                    >
                      <path d="M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z" />
                    </svg>
                  </button>
                </div>
                <DialogTitle className="text-lg mb-4">Create Event</DialogTitle>
                <div className="space-y-3">
                  <input
                    name="title"
                    type="text"
                    placeholder="Event title"
                    value={formData.title}
                    onChange={handleOnChange}
                    className="w-full rounded-md dark:bg-[#2a2a2b] dark:text-[#e3e3e3] text-[#444746] p-2 dark:outline-none border dark:border-[#333537] border-[#dde3ea] focus-within:outline-0"
                  />
                  <div className="flex gap-2">
                    <div className="w-full">
                      <label htmlFor="startDate" className="block text-sm mb-1">
                        Start Date
                      </label>
                      <input
                        id="startDate"
                        name="startDate"
                        type="date"
                        value={formData.startDate}
                        min={new Date().toISOString().split("T")[0]}
                        onChange={handleOnChange}
                        className="w-full rounded-md dark:bg-[#2a2a2b] dark:text-[#e3e3e3] text-[#444746] p-2 dark:outline-none border dark:border-[#333537] border-[#dde3ea]"
                      />
                    </div>
                    <div className="w-full">
                      <label htmlFor="endDate" className="block text-sm mb-1">
                        End Date
                      </label>
                      <input
                        id="endDate"
                        name="endDate"
                        type="date"
                        value={formData.endDate}
                        min={
                          formData.startDate ||
                          new Date().toISOString().split("T")[0]
                        }
                        onChange={handleOnChange}
                        className="w-full rounded-md dark:bg-[#2a2a2b] dark:text-[#e3e3e3] text-[#444746] p-2 dark:outline-none border dark:border-[#333537] border-[#dde3ea]"
                      />
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <div className="w-full">
                      <label htmlFor="startTime" className="block text-sm mb-1">
                        Start Time
                      </label>
                      <select
                        id="startTime"
                        name="startTime"
                        value={formData.startTime}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            startTime: e.target.value,
                          })
                        }
                        className="w-full rounded-md dark:bg-[#2a2a2b] dark:text-[#e3e3e3] text-[#444746] p-2 dark:outline-none border dark:border-[#333537] border-[#dde3ea]"
                      >
                        <option value="">Select</option>
                        {timeOptions.map((opt) => (
                          <option key={opt.value} value={opt.value}>
                            {opt.label}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="w-full">
                      <label htmlFor="endTime" className="block text-sm mb-1">
                        End Time
                      </label>
                      <select
                        id="endTime"
                        name="endTime"
                        value={formData.endTime}
                        onChange={(e) =>
                          setFormData({ ...formData, endTime: e.target.value })
                        }
                        className="w-full rounded-md dark:bg-[#2a2a2b] dark:text-[#e3e3e3] text-[#444746] p-2 dark:outline-none border dark:border-[#333537] border-[#dde3ea]"
                      >
                        <option value="">Select</option>
                        {timeOptions.map((opt) => (
                          <option key={opt.value} value={opt.value}>
                            {opt.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <textarea
                    name="description"
                    placeholder="Description (optional)"
                    value={formData.description}
                    onChange={handleOnChange}
                    className="w-full rounded-md dark:bg-[#2a2a2b] dark:text-[#e3e3e3] text-[#444746] p-2 dark:outline-none border dark:border-[#333537] border-[#dde3ea] focus-within:outline-0"
                  />
                </div>
                <div className="mt-6 flex justify-end gap-2">
                  <button
                    type="button"
                    className="px-6 py-2 rounded-full dark:bg-[#a8c7fa] bg-[rgb(11,87,208)] dark:text-[#062e6f] text-[#fff] disabled:opacity-70 disabled:!cursor-not-allowed"
                    disabled={isFormValid}
                    onClick={handleSubmit}
                  >
                    Save
                  </button>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
