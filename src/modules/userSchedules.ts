import { ISchedule } from '@/utils/data'
import { useSelector } from 'react-redux'
import { GlobalState } from '.'

interface scheduleAction {
  type: string
  schedules: ISchedule[]
}

export const getScheduleById = (schedule_id: string) => {
  const schedules = useSelector(
    ({ userSchedules }: GlobalState) => userSchedules
  )
  return schedules.find((schedule) => schedule.schedule_id == schedule_id)
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
