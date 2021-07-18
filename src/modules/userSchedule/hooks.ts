import { getUserSchedule } from "@/api/home/getSchedule";
import { IUserSchedule } from "@/utils/data";
import { AxiosError, AxiosResponse } from "axios";
import { Dispatch } from "react";
import { useDispatch, useSelector } from "react-redux"
import { 
    UserScheduleAction, 
    USER_SCHEDULES_ACHIEVEMENT_UPDATE, 
    USER_SCHEDULES_FETCH, 
} from "./reducer";
import { GlobalState } from "../index"
import { useUserState } from "../auth/hooks";

export const useUserSchedule = () => {
    const dispatch:Dispatch<UserScheduleAction> = useDispatch();
    const schedules = useSelector( ({ userSchedulesState }: GlobalState) => userSchedulesState);
    const { getToken } = useUserState();
    
    const fetchUserSchedule = async ():Promise<boolean> => {
        const token = await getToken();
        if(!token) return false;
        
        let succeed = false;
        await getUserSchedule(token)
            .then((res:AxiosResponse<IUserSchedule[]>) => {
                dispatch({type: USER_SCHEDULES_FETCH, schedules: res.data})
                succeed = true
            }).catch((err:AxiosError) => {
                console.log(err.response)
            })
        return succeed
    }

    // Schedule의 ID로 스케쥴 찾음
    const getScheduleById = (schedule_id: string) => {
        return schedules.find((schedule) => schedule.schedule.id === schedule_id)
    }

    const updateAchievement = (userschedule_id:string, changedProof:number) => {
        dispatch({
            type: USER_SCHEDULES_ACHIEVEMENT_UPDATE, 
            proofChanges:{
                userschedule_id,
                value: changedProof
            }
        })
    }

    return {
        schedules,
        fetchUserSchedule,
        getScheduleById,
        updateAchievement
    }
}