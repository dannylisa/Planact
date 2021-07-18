import { ITokenHeader } from "@/modules/auth/hooks";
import axios from "axios";
import { APP_BASE_URL } from "../host";

export function deleteUserSchedule(token:ITokenHeader, userschedule_id: string){
    return axios.delete(APP_BASE_URL+"schedule/attach/"+userschedule_id,{
        headers: token
    })
}

export function deleteUserScheduleAfter(token:ITokenHeader, userschedule_id: string){
    return axios.patch(APP_BASE_URL+"schedule/attach/"+userschedule_id,{
        headers: token
    })
}