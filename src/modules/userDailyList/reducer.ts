import { IDaily, IDailyList, IUserEvent } from "@/utils/data";
import dayjs from "dayjs";
import produce from "immer";
import { Alert } from "react-native";
interface UserDailyListStateProps extends IDailyList {
    selected: number
}
const initialEvents:IDaily[] = Array(15).fill(0).map((_, i):IDaily => ({
    date: dayjs().add(i, 'days'),
    events: []
}))

export const initDailyState:UserDailyListStateProps = {
    start: dayjs(),
    end: dayjs().add(15, 'day'),
    selected: 0,
    dailys: initialEvents
}

export interface DailyFetchedProps {
    start: string
    end: string
    dailys: IDaily[]
}
const to_dayjs = (dailys:IDaily[]):IDaily[] => (
    dailys.map(({date, events}) => ({date:dayjs(date), events}))
)

// 처음 fetch 받았을 때 오늘이 몇 번째 날인지
export const INITIAL_TODAY_INDEX = 7 as const;
export const ONCE_FETCH_DAYS = 7 as const;
export const DAILY_FETCH_INITIAL = 'user/daily/fetch/initial' as const;
export const DAILY_FETCH_PREV = 'user/daily/fetch/prev' as const;
export const DAILY_FETCH_NEXT = 'user/daily/fetch/next' as const;
export const DAILY_UPDATE_PROOF = 'user/daily/update/proof' as const;
export const DAILY_SELECT = 'user/daily/select' as const;

type UserDailyListActionType = 
    'user/daily/fetch/initial'
        |'user/daily/fetch/prev' 
        |'user/daily/fetch/next' 
        | 'user/daily/select' 
        | 'user/daily/update/proof'
export interface UserDailyListAction {
    type: UserDailyListActionType
    fetchData?: DailyFetchedProps
    selected?: number
    updatedDailyInfo?:{
        userevent_id: string
        proof: number
        diary?: string
        photo?: File
    }
}

const userDailyListState = (state: UserDailyListStateProps = initDailyState, action: UserDailyListAction) => {
    const { type, fetchData, selected, updatedDailyInfo } = action;
    switch (type) {
        case DAILY_FETCH_INITIAL:
            return fetchData ? { 
                selected:INITIAL_TODAY_INDEX,
                start: dayjs(fetchData.start),
                end: dayjs(fetchData.end),
                dailys: to_dayjs(fetchData.dailys)
            } : state
        case DAILY_FETCH_PREV:
            return fetchData ? { 
                selected: state.selected+ONCE_FETCH_DAYS,
                start: dayjs(fetchData.start),
                end: state.end,
                dailys: to_dayjs(fetchData.dailys).concat(state.dailys)
            } : state
        case DAILY_FETCH_NEXT:
            return fetchData ? { 
                selected: state.selected,
                start: state.start,
                end: dayjs(fetchData.end),
                dailys: state.dailys.concat(to_dayjs(fetchData.dailys))
            } : state
        case DAILY_SELECT:
            return selected!==undefined ? {
                ...state,
                selected
            }: state
        case DAILY_UPDATE_PROOF:
            if(!updatedDailyInfo)
                return state;
            return produce(state, baseState => {
                const {userevent_id, ...updates} = updatedDailyInfo;

                // Find Daily
                const daily:IDaily = baseState.dailys[baseState.selected];

                // Find Event in Daily
                const targetIdx = daily.events.findIndex(event => event.id === userevent_id)
                if(targetIdx===-1)
                    throw Error("User Event Not Found")

                // Update Event & Daily
                let target = daily.events[targetIdx];
                target = {...target, ...updates}
                daily.events.splice(targetIdx, 1, target)

                // Update UserDailyListState
                baseState.dailys.splice(baseState.selected, 1, daily)
            });

        default:
            return state
    }
}
export default userDailyListState;
  