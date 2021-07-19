import { getDailyList } from "@/api/home/getDailyList";
import { AxiosError, AxiosResponse } from "axios";
import { Dispatch } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DailyFetchedProps, DAILY_FETCH_INITIAL, DAILY_FETCH_NEXT, DAILY_FETCH_PREV, DAILY_SELECT, DAILY_UPDATE_PROOF, UserDailyListAction } from "./reducer";
import { GlobalState } from "..";
import { useUserState } from "../auth/hooks";
import updateProof_api from "@/api/home/updateProof";
import { useUserSchedule } from "../userSchedule/hooks";

export function useDailyList(){
    const dispatch:Dispatch<UserDailyListAction> = useDispatch();
    const dailyState = useSelector(({userDailyListState}:GlobalState) => userDailyListState);
    const { getToken } = useUserState();
    const {selected, start, end, dailys} = dailyState

    const setSelectedDaily = (idx:number) => dispatch({type:DAILY_SELECT, selected:idx})
    const getSelectedDaily = () => dailys[selected];
    const initialDailyFetch = () => {
        getToken()
            .then((token) => {
                if(!token) 
                    throw Error("Invalid Token.");
                return getDailyList({token})
            }).then((res:AxiosResponse<DailyFetchedProps>) => {
                dispatch({type: DAILY_FETCH_INITIAL, fetchData:res.data})
            }).catch((err:AxiosError) => {
                console.log(err.response)
            })
    }

    const previousFetch = async () => {
        const token = await getToken();
        if(!token) return;
        await getDailyList({
                token,
                start: start.add(-7, 'days').format("YYYY-MM-DD"),
                end: start.add(-1, 'days').format("YYYY-MM-DD")
            })
            .then((res:AxiosResponse<DailyFetchedProps>) => {
                dispatch({type: DAILY_FETCH_PREV, fetchData:res.data})
            }).catch((err:AxiosError) => {
                console.log(err.response)
            })
    }

    const nextFetch = async () => {
        const token = await getToken();
        if(!token) return;
        await getDailyList({
                token,
                start: end.add(1, 'days').format("YYYY-MM-DD"),
                end: end.add(7, 'days').format("YYYY-MM-DD")
            })
            .then((res:AxiosResponse<DailyFetchedProps>) => {
                dispatch({type: DAILY_FETCH_NEXT, fetchData:res.data})
            }).catch((err:AxiosError) => {
                console.log(err.response)
            })
    }

    return {
        start, end, dailys,
        selected,
        setSelectedDaily,
        getSelectedDaily,
        initialDailyFetch,
        previousFetch,
        nextFetch,
    }
}

export interface UpdateProofProps {
    userschedule_id: string
    userevent_id: string
    proof: number
    prev_proof: number | null
    diary?: string
    photo?: string
}
export function useDailyUpdate(){
    const { getToken } = useUserState();
    const { getSelectedDaily } = useDailyList();
    const { updateAchievement } = useUserSchedule();
    const dispatch:Dispatch<UserDailyListAction> = useDispatch();

    const getEventOfDailyById = (userevent_id:string) => {
        const daily = getSelectedDaily();
        return daily.events.find(event => event.id === userevent_id)
    }
    const getEventOfDailyBySeq = (seq: number) => {
        const daily = getSelectedDaily();
        return daily.events.find(event => event.event.seq === seq)
    }

    const updateProof = async ({prev_proof, ...props}:UpdateProofProps) => {
        const token = await getToken();
        if(!token) return false;
        let succeed:boolean = false
        await updateProof_api({...props, token})
            .then((res:AxiosResponse) => {
                dispatch({type: DAILY_UPDATE_PROOF, updatedDailyInfo: props})
                succeed = true
            })
            .then(() => updateAchievement(
                props.userschedule_id, 
                +Boolean(props.proof) - (+Boolean(prev_proof))
            ))
            .catch((err:AxiosError) => {
                console.log(err.response?.data)
            })

        
        return succeed
    }

    return {
        updateProof,
        getEventOfDailyById,
        getEventOfDailyBySeq
    }
}