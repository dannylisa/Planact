// Program >> Schedule >> Event
import { Dayjs } from 'dayjs'

// 0 : 평일 , 1: 토요일, 2: 일요일, 공휴일
export type daytype = 0 | 1 | 2

type Fixables = 'datetime' | 'date' | 'time' | 'none'
export interface ISchedule {
  id: int
  name: string
  abb: string
  user_likes: boolean | null
  count_likes: number | null
  has_attached: boolean | null
  duration: number
  icon: string
  category: string
  description: string
  thumbnail: string
  fixed: Fixables
  price: int
}
export interface IUserSchedule {
  schedule: ISchedule
  id: string,
  alias: string
  start_date: string
  end_date: string
  color: string
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
}
export interface IUserEvent {
  id:string
  proof:number
  user:string
  time:string
  date: string
  event:IEvent
  diary?: string
  photo?: string
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
