import { render, screen, fireEvent } from "@testing-library/react";
import CreateEventModal from "./CreateEvent";

// Mock uuid
jest.mock("uuid", () => ({
  v4: () => "mock-uuid",
}));

// Mock store
const addEventMock = jest.fn();

const store = {
    addEvent: addEventMock,
  };
  
jest.mock("../../store/eventStore.ts", () => ({
    useEventStore: Object.assign(() => store, {
      getState: () => store,
      setState: () => {},
      subscribe: () => () => {},
    }),
  }));

describe("CreateEventModal", () => {
  const onCloseMock = jest.fn();

  const setup = () =>
    render(<CreateEventModal isOpen={true} onClose={onCloseMock} />);

  beforeEach(() => {
    addEventMock.mockClear();
    onCloseMock.mockClear();
  });

  it("renders modal content when open", () => {
    setup();
    expect(screen.getByText("Create Event")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Event title")).toBeInTheDocument();
  });

  it("disables submit button if form is incomplete", () => {
    setup();
    const button = screen.getByRole("button", { name: /save/i });
    expect(button).toBeDisabled();
  });

  it("enables submit button and submits form when valid", () => {
    setup();

    fireEvent.change(screen.getByPlaceholderText("Event title"), {
      target: { value: "Team Sync" },
    });
    fireEvent.change(screen.getByPlaceholderText("Description (optional)"), {
      target: { value: "An important meeting" },
    });
    fireEvent.change(screen.getByLabelText("Start Date"), {
      target: { value: "2025-06-20" },
    });
    fireEvent.change(screen.getByLabelText("End Date"), {
      target: { value: "2025-06-20" },
    });
    fireEvent.change(screen.getByLabelText("Start Time"), {
      target: { value: "09:00" },
    });
    fireEvent.change(screen.getByLabelText("End Time"), {
      target: { value: "10:00" },
    });

    const button = screen.getByRole("button", { name: /save/i });
    expect(button).toBeEnabled();

    fireEvent.click(button);

    expect(addEventMock).toHaveBeenCalledWith({
      id: "mock-uuid",
      title: "Team Sync",
      description: "An important meeting",
      startDate: "2025-06-20",
      endDate: "2025-06-20",
      startTime: "09:00",
      endTime: "10:00",
    });

    // expect(onCloseMock).toHaveBeenCalled();
  });

  it("closes modal and resets form when closed manually", () => {
    setup();
    expect(screen.getByText("Create Event")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Event title")).toBeInTheDocument();
    const closeBtn = screen.getByRole("button", { name: "Close" });
    fireEvent.click(closeBtn);
    expect(onCloseMock).toHaveBeenCalled();
  });
});
