import { ISchedule, IUserSchedule } from '@/utils/data'
import dayjs, { Dayjs } from 'dayjs'

export const USER_SCHEDULES_FETCH = 'user/schedules/fetch' as const
export const USER_SCHEDULES_SHOULD_FETCH_SIGNAL = 'user/schedules/setShouldFetch' as const


export interface UserScheduleAction {
    type: 'user/schedules/fetch' | 'user/schedules/setShouldFetch',
    schedules?: IUserSchedule[]
};

export interface UserSchedulesStateProps {
  shouldFetch: boolean
  schedules: IUserSchedule[]
}
const initState:UserSchedulesStateProps = {
  shouldFetch: true,
  schedules: []
}

const userSchedulesState = (state: UserSchedulesStateProps = initState, action: UserScheduleAction) => {
  const { type, schedules } = action;
  switch (type) {
    case USER_SCHEDULES_FETCH:
      return schedules ? {
        shouldFetch: false,
        schedules
      } : state
    case USER_SCHEDULES_SHOULD_FETCH_SIGNAL:
      return {
        shouldFetch: true,
        schedules: state.schedules
      }
    default:
      return state
  }
}


export default userSchedulesState
