import { ISchedule } from '@/utils/data'

export const getMarketSchedules = async (programId): Promise<ISchedule[]> => {
  return schedules_dummy
}

export const schedules_dummy: ISchedule[] = [
  {
    program_id: '1',
    schedule_id: 'health1',
    color: '#333333',
    publisher: 'Lee Su young',
    topic: '광배근 기르기',
  },
  {
    program_id: '1',
    schedule_id: 'health2',
    color: '#333333',
    publisher: 'Lee Su young',
    topic: '이두박근 기르기',
  },
  {
    program_id: '1',
    schedule_id: 'health3',
    color: '#333333',
    publisher: 'Lee Su young',
    topic: '코어근육 기르기',
  },
]
