import { create } from "zustand";
import { persist } from "zustand/middleware";

interface Event {
  id: string;
  title: string;
  description?: string;
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
}

interface EventState {
  events: Event[];
  addEvent: (event: Event) => void;
  getEventsForDate: (date: string) => Event[];
  selectedEvent: Event | null
  clearSelectedEvent: () => void;
  setSelectedEvent: (event: Event) => void; 
  updateEventTime: (id:string, event: Event) => void; 
  deleteEvent: (id:string) => void; 
  
}

export const useEventStore = create<EventState>()(
  persist(
    (set, get) => ({
      events: [],
      selectedEvent: null,
      addEvent: (event: Event) =>
        set((state) => ({
          events: [...state.events, event],
        })),
      getEventsForDate: (date) => {
        return get().events.filter((event: Event) => event.startDate === date);
      },
      setSelectedEvent: (event: Event) => set({ selectedEvent: event }),

      clearSelectedEvent: () => set({ selectedEvent: null }),
      updateEventTime: (id, newTimes) => {
        set((state) => ({
          events: state.events.map((event) =>
            event.id === id ? { ...event, ...newTimes } : event
          ),
        }));
      },

      deleteEvent: (id: string) => {
        set((state) => ({
          events: state.events.filter((event) => event.id !== id),
        }));
      },
      
    }),
    { name: "event-storage" }
  )
);
