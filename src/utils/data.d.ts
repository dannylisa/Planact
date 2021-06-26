// Program >> Schedule >> Event
import { Dayjs } from 'dayjs'

// 0 : 평일 , 1: 토요일, 2: 일요일, 공휴일
export type daytype = 0 | 1 | 2

export interface IProgram {
  program_id: string
  publisher_id: string
  program_name: string
  description: string
  photoUrl: string
  price: number
}

export interface ISchedule {
  schedule_id: string
  color: string
  publisher: string
  topic: string
}

export interface IEvent {
  title: string
  abb: string
  dateof: number
  content: strng
  icon: string
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

