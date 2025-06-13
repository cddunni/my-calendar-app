import { fireEvent, render, screen } from '@testing-library/react';
import EventDetails from './EventDetails';
import { useEventStore } from '../../store/eventStore';

jest.mock('../../store/eventStore', () => ({
  useEventStore: jest.fn()
}));

const mockedUseEventStore = useEventStore as unknown as jest.Mock

describe('EventDetails', () => {
  const mockClearSelectedEvent = jest.fn();

  const selectedEventMock = {
    title: 'Test Event',
    startDate: '2024-06-01T12:00:00Z',
    endDate: '2024-06-01T13:00:00Z',
    startTime: '12:00',
    endTime: '13:00',
    description: 'Event description'
  };

  beforeEach(() => {
    mockedUseEventStore.mockReturnValue({
      selectedEvent: selectedEventMock,
      clearSelectedEvent: mockClearSelectedEvent
    });
  });

  it('renders event details when selectedEvent is present', () => {
    render(<EventDetails />);

    expect(screen.getByText(/event details/i)).toBeInTheDocument();
    expect(screen.getByText('Test Event')).toBeInTheDocument();
    expect(screen.getByText('Event description')).toBeInTheDocument();
  });

  it('calls clearSelectedEvent when close button is clicked', () => {
    render(<EventDetails />);
    const closeButton = screen.getByRole('button', { name: /close/i });
    fireEvent.click(closeButton);
    expect(mockClearSelectedEvent).toHaveBeenCalledTimes(1);
  });

  it('returns null if no selectedEvent', () => {
    mockedUseEventStore.mockReturnValue({
      selectedEvent: null,
      clearSelectedEvent: jest.fn(),
    });

    const { container } = render(<EventDetails />);
    expect(container.firstChild).toBeNull();
  });
});
