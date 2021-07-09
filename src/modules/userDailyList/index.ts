import { IDaily, IDailyList, IUserEvent } from "@/utils/data";
import dayjs from "dayjs";


interface UserDailyListStateProps extends IDailyList {
    selected: number
}
const initialEvents:IDaily[] = Array(8).fill(0).map((_, i):IDaily => ({
    date: dayjs().add(i, 'days'),
    events: []
}))

const initState:UserDailyListStateProps = {
    start: dayjs(),
    end: dayjs().add(7, 'day'),
    selected: 0,
    dailys: initialEvents
}

export interface DailyFetchedProps {
    start: string
    end: string
    dailys: IDaily[]
}
const to_dayjs = ({start, end, dailys}:DailyFetchedProps):IDailyList => ({
    start: dayjs(start),
    end: dayjs(end),
    dailys: dailys.map(({date, events}) => ({date:dayjs(date), events}))
})

// 처음 fetch 받았을 때 오늘이 몇 번째 날인지
export const INITIAL_TODAY_INDEX = 7 as const;
export const DAILY_FETCH_INITIAL = 'user/daily/fetch/initial' as const
export const DAILY_SELECT = 'user/daily/select' as const


export interface UserDailyListAction {
    type: 'user/daily/fetch/initial' | 'user/daily/select' 
    fetchData?: DailyFetchedProps
    selected?: number
}

const userDailyListState = (state: UserDailyListStateProps = initState, action: UserDailyListAction) => {
    const { type, fetchData, selected } = action;
    switch (type) {
        case DAILY_FETCH_INITIAL:
            fetchData && console.log({ 
                selected:INITIAL_TODAY_INDEX,
                ...to_dayjs(fetchData)
            })
            return fetchData ? { 
                selected:INITIAL_TODAY_INDEX,
                ...to_dayjs(fetchData)
            } : state
        case DAILY_SELECT:
            return selected ? {
                ...state,
                selected
            }: state
        default:
            return state
    }
}
export default userDailyListState;
  