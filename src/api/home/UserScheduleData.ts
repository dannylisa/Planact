import { ISchedule } from '@/utils/data'

export const getUserSchedule = async (
  user_id: string
): Promise<ISchedule[]> => {
  return schedules_dummy
}
// ffc8c8 원래 헬스 색
// bbbbff 원래 영어 색
// schedule_id(더미 데이터) 1: 운동/헬스, 2: 영어공부 3: 수학공부
const schedules_dummy: ISchedule[] = [
  {
    schedule_id: '1',
    color: '#ffd0ef',
    publisher: 'swimmie',
    topic: '헬스',
    program_id: '1111',
  },
  {
    schedule_id: '2',
    color: '#ffc7ba',
    publisher: 'swimmie',
    topic: '영어',
    program_id: '2222',
  },
  {
    schedule_id: '3',
    color: '#bbffbb',
    publisher: 'swimmie',
    topic: '수학',
    program_id: '3333',
  },
]
