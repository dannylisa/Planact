import { ISchedule, IUserSchedule } from '@/utils/data'
import dayjs, { Dayjs } from 'dayjs'
import produce from 'immer'

export const USER_SCHEDULES_FETCH = 'user/schedules/fetch' as const
export const USER_SCHEDULES_SHOULD_FETCH_SIGNAL = 'user/schedules/setShouldFetch' as const
export const USER_SCHEDULES_ACHIEVEMENT_UPDATE = 'user/schedules/achievement/update' as const


export interface UserScheduleAction {
    type: 'user/schedules/fetch' | 'user/schedules/setShouldFetch' | 'user/schedules/achievement/update'
    schedules?: IUserSchedule[]
    proofChanges?: {
      userschedule_id: string
      value:number
    }
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
  const { type, schedules, proofChanges } = action;
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
    case USER_SCHEDULES_ACHIEVEMENT_UPDATE:
      if(!proofChanges)
        return state
      const {userschedule_id, value} = proofChanges
      const scheduleIdx = state.schedules.findIndex(schedule => schedule.id = userschedule_id)
      if(scheduleIdx === -1)
        return state
      return produce(state, baseState => {
          const schedule_changed = baseState.schedules[scheduleIdx];
          schedule_changed.achievement+=value
          baseState.schedules.splice(scheduleIdx, 1, schedule_changed)
      })

    default:
      return state
  }
}


export default userSchedulesState
