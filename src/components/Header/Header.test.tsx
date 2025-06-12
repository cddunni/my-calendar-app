import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Header from "./Header";
import { useCalendarStore } from "../../store";

// Mock the store hook
jest.mock("../../store", () => ({
  useCalendarStore: jest.fn(),
}));

describe("Header component", () => {
  const goToTodayMock = jest.fn();
  const goToPrevMock = jest.fn();
  const goToNextMock = jest.fn();
  const setViewMock = jest.fn();

  const openCreateModalMock = jest.fn();
  
  beforeEach(() => {
    jest.clearAllMocks();

    // Provide default mock implementation for useCalendarStore
    (useCalendarStore as jest.Mock).mockReturnValue({
      currentDate: new Date("2025-06-12"),
      view: "Month",
      setView: setViewMock,
      goToToday: goToTodayMock,
      goToNext: goToNextMock,
      goToPrev: goToPrevMock,
    });
  });

  it("renders correctly with current date and default view", () => {
    render(<Header openCreateModal={openCreateModalMock} />);

    // Header and buttons
    expect(screen.getByRole("banner")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /today/i })).toBeInTheDocument();

    // Date heading with formatted month and year
    expect(screen.getByText("June 2025")).toBeInTheDocument();

    // View button with default view text
    expect(screen.getByRole("button", { name: /select calendar view/i })).toHaveTextContent("Month");

    // Create event button
    expect(screen.getByRole("button", { name: /create a new event/i })).toBeInTheDocument();
  });

  it("calls goToToday when Today button is clicked", () => {
    render(<Header openCreateModal={openCreateModalMock} />);
    fireEvent.click(screen.getByRole("button", { name: /today/i }));
    expect(goToTodayMock).toHaveBeenCalledTimes(1);
  });

  it("calls goToPrev and goToNext when navigation buttons clicked", () => {
    render(<Header openCreateModal={openCreateModalMock} />);
    fireEvent.click(screen.getByRole("button", { name: /go to previous/i }));
    fireEvent.click(screen.getByRole("button", { name: /go to next/i }));
    expect(goToPrevMock).toHaveBeenCalledTimes(1);
    expect(goToNextMock).toHaveBeenCalledTimes(1);
  });

  it("calls openCreateModal when Create Event button is clicked", () => {
    render(<Header openCreateModal={openCreateModalMock} />);
    fireEvent.click(screen.getByRole("button", { name: /create a new event/i }));
    expect(openCreateModalMock).toHaveBeenCalledTimes(1);
  });
});
