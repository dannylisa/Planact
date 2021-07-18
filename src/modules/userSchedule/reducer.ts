import { ISchedule, IUserSchedule } from '@/utils/data'
import dayjs, { Dayjs } from 'dayjs'
import produce from 'immer'

export const USER_SCHEDULES_FETCH = 'user/schedules/fetch' as const
export const USER_SCHEDULES_ACHIEVEMENT_UPDATE = 'user/schedules/achievement/update' as const


export interface UserScheduleAction {
    type: 'user/schedules/fetch' | 'user/schedules/achievement/update'
    schedules?: IUserSchedule[]
    proofChanges?: {
      userschedule_id: string
      value:number
    }
};

const userSchedulesState = (state: IUserSchedule[] = [], action: UserScheduleAction) => {
  const { type, schedules, proofChanges } = action;
  switch (type) {
    case USER_SCHEDULES_FETCH:
      return schedules ? schedules : state

    case USER_SCHEDULES_ACHIEVEMENT_UPDATE:
      if(!proofChanges)
        return state
      const {userschedule_id, value} = proofChanges
      const scheduleIdx = state.findIndex(schedule => schedule.id = userschedule_id)
      if(scheduleIdx === -1)
        return state
      return produce(state, baseState => {
          const schedule_changed = baseState[scheduleIdx];
          schedule_changed.achievement+=value
          baseState.splice(scheduleIdx, 1, schedule_changed)
      })

    default:
      return state
  }
}


export default userSchedulesState
