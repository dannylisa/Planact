import { IDaily, IDailyList, IUserEvent } from "@/utils/data";
import dayjs from "dayjs";
import produce from "immer";
import { Alert } from "react-native";
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
export const DAILY_FETCH_INITIAL = 'user/daily/fetch/initial' as const;
export const DAILY_UPDATE_PROOF = 'user/daily/update/proof' as const;
export const DAILY_SELECT = 'user/daily/select' as const;


export interface UserDailyListAction {
    type: 'user/daily/fetch/initial' | 'user/daily/select' | 'user/daily/update/proof'
    fetchData?: DailyFetchedProps
    selected?: number
    updatedDailyInfo?:{
        userevent_id: string
        proof: number
        diary?: string
        photo?: File
    }
}

const userDailyListState = (state: UserDailyListStateProps = initState, action: UserDailyListAction) => {
    const { type, fetchData, selected, updatedDailyInfo } = action;
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
  