import { ITokenHeader } from "@/modules/auth/hooks"
import axios from "axios"
import { APP_BASE_URL } from "../host"

export default (token:ITokenHeader, schedule_id: string) => {
    return axios.get(APP_BASE_URL+"schedule/details/"+schedule_id, {
        headers: token,
        params: {
            limit: 5,
            seqlimit:4
        }
    })
}