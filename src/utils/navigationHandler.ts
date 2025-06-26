import { addDays, addMonths, addWeeks, startOfToday, subDays, subMonths, subWeeks } from 'date-fns'
import type { ViewMode } from '../types'

interface Params {
  action: 'next' | 'prev' | 'today'
  currentDate: Date
  currentView: ViewMode
}

export function handleDateNavigation({ action, currentDate, currentView }: Params): Date {
  if (action === 'today') return startOfToday()

  switch (currentView) {
    case 'month':
      return action === 'next' ? addMonths(currentDate, 1) : subMonths(currentDate, 1)
    case 'week':
      return action === 'next' ? addWeeks(currentDate, 1) : subWeeks(currentDate, 1)
    case 'day':
      return action === 'next' ? addDays(currentDate, 1) : subDays(currentDate, 1)
    default:
      return currentDate
  }
}
