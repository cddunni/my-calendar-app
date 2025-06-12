import { DayPicker } from "react-day-picker";
import "./App.css";
import { Header } from "./components";
import CalendarGrid from "./components/Calendar/CalendarGrid";
import "react-day-picker/dist/style.css";
import { useCalendarStore } from "./store";
import { useState } from "react";
import EventDetails from "./components/EventDetails";
import CreateEvent from "./components/CreateEvent";

function App() {
  const { currentDate, setCurrentDate } = useCalendarStore();
  const [open, setOpen] = useState(false);
  
  return (
    <div className="app text-right flex p-4 space-x-2 dark:bg-[#1c1c1c] bg-[#f8fafd]">
      <div className="min-w-[250px] text-center items-start flex-col space-y-6 lg:flex hidden">
        <p className="font-medium text-2xl text-[#1f1f1f] dark:text-[#e3e3e3]">Calendar</p>
        <DayPicker
          selected={currentDate}
          onSelect={(date) => date && setCurrentDate(date)}
          mode="single"
          className="my-calendar"
        />
      </div>
      <div className="w-full">
        <Header openCreateModal={() => setOpen(true)}/>
        <CalendarGrid />
      </div>
      <CreateEvent isOpen={open} onClose={() => setOpen(false)} />
      <EventDetails />
    </div>
  );
}

export default App;
