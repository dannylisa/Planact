import { ITokenHeader } from "@/modules/auth/hooks"
import axios from "axios"
import { APP_BASE_URL } from "../host"

export default (schedule_id: string, token:ITokenHeader) => {
    return axios.get(APP_BASE_URL+"schedule/details/"+schedule_id, {
        headers: token,
        params: {
            limit: 5,
            seqlimit:5
        }
    })
}