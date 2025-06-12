# 📅 Calendar App - A Google Calendar clone
Table of Contents
- About the Project
- Setup and running instructions
- Architecture and design decisions
- Issues, limitations, or assumptions made.
- Features/Component Breakdown
- Bonus features
- Project Link


# About the Project
A responsive and accessible calendar application that allows users to view and manage events in **Day**, **Week**, and **Month** views. The app emphasizes clean design, intuitive navigation, and a robust architecture.

## 🚀 Setup & Running Instructions

### 1. Clone the repository
```bash
git clone https://github.com/your-username/calendar-app.git
cd calendar-app
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Start the development server
```bash
npm run dev
```

### 4. Run tests
```bash
npm run test
✅ The app uses Vite for faster build and hot module replacement.
```

## 🏗 Architecture & Design Decisions
🔌 State Management
- Zustand (useCalendarStore) is used for global calendar state like:
   - Current view (Day, Week, Month)
   - Current date
   - Navigation functions (goToNext, goToPrev, goToToday)
- We chose Zustand for its lightweight, boilerplate-free API, and React hook-friendly usage without additional context providers.


## 🧩 Component Structure
```bash
src/
│
├── components/
│   ├── Header.tsx        // Top bar with view toggle and navigation
│   ├── CalendarGrid.tsx  // Main calendar rendering logic
│   └── EventModal.tsx    // Create/edit event modal
│
├── store/
│   └── index.ts          // Zustand store logic
│
├── pages/
│   └── index.tsx         // Entry point
│
├── utils/                // Date helpers and utility functions
└── tests/                // Unit and integration tests
```
- Headless UI is used for accessible dropdowns.
- Date-fns handles date manipulations for performance and modularity.
- Testing Library is used to ensure interaction accessibility and usability.

## ⚠ Known Issues & Limitations
- 🧪 Testing Headless UI dropdowns may require explicitly setting roles like role="menuitem" for consistent test detection.

- 🔄 The app does not yet support event recurrence or drag-and-drop rescheduling.

- 📅 Time zone handling is currently local-only and not internationalized.

- 🗃️ No backend integration — events are currently stored in memory only.

## 🎁 Bonus Features

- ✅ Responsive design for mobile and desktop layouts.
- ✅ Accessible navigation using screen reader-friendly labels and ARIA roles.
- ✅ Component-level test coverage using Jest + React Testing Library.
- ✅ Dark Mode Toggle: Users can switch between a light and dark theme.
- 🚧 Placeholder for future backend/API integration for persistent event storage.

## 🛠 Tech Stack
- React + TypeScript
- Zustand (state management)
- Headless UI (accessible components)
- Tailwind CSS (styling)
- Jest + React Testing Library (testing)
- Date-fns (date utilities)
- Vite (build tool)


