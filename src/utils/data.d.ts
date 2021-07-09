// Program >> Schedule >> Event
import { Dayjs } from 'dayjs'

// 0 : 평일 , 1: 토요일, 2: 일요일, 공휴일
export type daytype = 0 | 1 | 2

export interface ISchedule {
  id: int
  name: string
  abb: string
  icon: string
  category: string
  description: string
  thumbnail: string
  price: int
}
export interface IUserSchedule {
  schedule: ISchedule
  id: string,
  start_date: string
  end_date: string
  color: string
  alias: string
}

type proofType = "NONE" | 'BOOLEAN'| 'SCORE'| 'STAR'| 'PHOTO'| 'DIARY'
export interface IEvent {
  id: int
  schedule: string
  dateof: int
  // 해당되는 스케쥴에서 몇 번째로 진행해야 하는지
  seq: int
  title: string
  content: string
  proof_type:proofType
  origin_date: string
  origin_time: string
  date_customizable: boolean
  time_customizable: boolean
}
export interface IUserEvent {
  id:string
  proof:number
  user:string
  time:string
  date: string
  event:IEvent
}

export interface GroupedEvent {
  schedule: IUserSchedule
  events: IUserEvent[]
}

export interface IDailyList {
  start: Dayjs
  end: Dayjs
  dailys: IDaily[]
}
export interface IDaily {
  date: Dayjs
  events: IUserEvent[]
}
