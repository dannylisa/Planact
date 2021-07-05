// Program >> Schedule >> Event
import { Dayjs } from 'dayjs'

// 0 : 평일 , 1: 토요일, 2: 일요일, 공휴일
export type daytype = 0 | 1 | 2

export interface IProgram {
  program_id: string
  publisher_id: string
  program_name: string
  description: string
  thumbnail: string
  price: number
  category: string
}

export interface ISchedule {
  id: int
  name: string
  created_at: string
  updated_at: string
  icon: string
  //TODO:prroftype설정해야함
  proof_type
  category: string
  description: string
  thumbnail: string
  price: int
  public: boolean
}

export interface IEvent {
  id: int
  schedule_id: int
  dateof: int
  seq: int
  title: string
  abb: string
  content: string
  proof_type
  origin_time: string
}

export type done = 0 | 1 | 2 | null
export interface IUserEvent extends IEvent {
  date: Dayjs
  completed: done
  schedule_id: string
  // 해당되는 스케쥴에서 몇 번째로 진행해야 하는지
  seq: number
}

export interface GroupedEvent extends ISchedule {
  events: IUserEvent[]
}

export interface IDailyList {
  start: Dayjs
  end: Dayjs
  data: Daily[]
}

export interface IDaily {
  date: Dayjs
  events: IUserEvent[]
}
// 0629 유저 데이터 인터페이스 추가
export interface IUser {
  user_id: string
  username: string
}
