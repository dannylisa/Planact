import { ITokenHeader } from "@/modules/auth/hooks"
import axios from "axios"
import { APP_BASE_URL } from "../host"

const URL = APP_BASE_URL+"schedule/comment/"

export const getScheduleComment = async (token:ITokenHeader, schedule_id:string) => {
    return axios.get(URL+schedule_id,{headers:token})
}
export const createScheduleComment = async (token:ITokenHeader, schedule_id:string, content: string) => {
    return axios.post(URL+schedule_id, {content},{
        headers:token
    })
}

export const updateScheduleComment = async (token:ITokenHeader, comment_id:string, content: string) => {
    return axios.patch(URL+comment_id, { content },{
        headers:token
    })
}

export const deleteScheduleComment = async (token:ITokenHeader, comment_id:string) => {
    return axios.delete(URL+comment_id, {headers:token})
}