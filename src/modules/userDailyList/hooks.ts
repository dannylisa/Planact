import { getDailyList } from "@/api/home/UserDailyData";
import { AxiosError, AxiosResponse } from "axios";
import { Dispatch } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DailyFetchedProps, DAILY_FETCH_INITIAL, DAILY_SELECT, UserDailyListAction } from "./index";
import { GlobalState } from "..";
import { useUserState } from "../auth/hooks";

export default function useDailyList(){
    const dispatch:Dispatch<UserDailyListAction> = useDispatch();
    const { getToken } = useUserState();
    const dailyState = useSelector(({userDailyListState}:GlobalState) => userDailyListState);
    const {selected, start, end, dailys} = dailyState

    const setSelectedDaily = (idx:number) => dispatch({type:DAILY_SELECT, selected:idx})
    const getSelectedDaily = () => dailys[selected];
    const initialDailyFetch = async () => {
        const token = await getToken();
        if(!token) return;
        await getDailyList({token})
            .then((res:AxiosResponse<DailyFetchedProps>) => {
                console.log('asdfasfsadad')
                console.log(res.data)
                dispatch({type: DAILY_FETCH_INITIAL, fetchData:res.data})
            }).catch((err:AxiosError) => {
                console.log(err)
                console.log(err.response)
            })
    }

    const additionalFetch = async () => {

    }

    return {
        start, end, dailys,
        selected,
        setSelectedDaily,
        getSelectedDaily,
        initialDailyFetch,
        additionalFetch
    }
}