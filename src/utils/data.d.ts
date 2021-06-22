// Program >> Schedule >> Event
import { Dayjs } from "dayjs";

export type daytype = 0 | 1 | 2;
export interface IProgram {

}

export interface ISchedule {
    publisher: string
    topic: string
}


export interface IEvent{
    title: string
    abb: string
    dateof: number
    content: strng
    icon: string
}

export interface IUserEvent extends IEvent{
    date: Dayjs
    completed: boolean
    color: string
}

export interface IDailyList {
    start: Dayjs
    end: Dayjs
    data: Daily[]
}

export interface IDaily {
    date: Dayjs
    events: User_Event[]
}