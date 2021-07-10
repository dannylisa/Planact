import { getUserSchedule } from "@/api/home/UserScheduleData";
import { IUserSchedule } from "@/utils/data";
import { AxiosError, AxiosResponse } from "axios";
import { Dispatch, useState } from "react";
import { batch, useDispatch, useSelector } from "react-redux"
import { UserScheduleAction, USER_SCHEDULES_FETCH, USER_SCHEDULES_SHOULD_FETCH_SIGNAL } from "./index";
import { GlobalState } from "../index"
import { useUserState } from "../auth/hooks";
import { Alert } from "react-native";

export const useUserSchedule = () => {
    const dispatch:Dispatch<UserScheduleAction> = useDispatch();
    const {shouldFetch, schedules} = useSelector( ({ userSchedulesState }: GlobalState) => userSchedulesState);
    const { getToken } = useUserState();
    const [loading, setLoading] = useState<boolean>(false)
    
    const fetchUserSchedule = async ():Promise<boolean> => {
        const token = await getToken();
        if(!token) return false;
        if(!shouldFetch) return false;
        
        let succeed = false;
        setLoading(true)
        await getUserSchedule(token)
            .then((res:AxiosResponse<IUserSchedule[]>) => {
                Alert.alert(JSON.stringify(res.data))
                dispatch({type: USER_SCHEDULES_FETCH, schedules: res.data})
                succeed = true
            }).catch((err:AxiosError) => {
                Alert.alert(JSON.stringify(err.response))
                console.log(err.response)
            })
        setLoading(false)
        return succeed
    }
    

    const setShouldFetchTrue = () => dispatch({type: USER_SCHEDULES_SHOULD_FETCH_SIGNAL})

    // Schedule의 ID로 스케쥴 찾음
    const getScheduleById = (schedule_id: string) => {
        return schedules.find((schedule) => schedule.schedule.id === schedule_id)
    }

    return {
        loading,
        shouldFetch,
        schedules,
        fetchUserSchedule,
        setShouldFetchTrue,
        getScheduleById
    }
}