import { ISchedule } from '@/utils/data'

interface scheduleAction {
  type: string
  schedules: ISchedule[]
}

export const SCHEDULES_FETCH = 'schedules/fetch' as const
const userSchedules = (state: ISchedule[] = [], action: scheduleAction) => {
  const { type, schedules } = action
  switch (type) {
    case 'schedules/fetch':
      return schedules
    default:
      return state
  }
}

export default userSchedules
