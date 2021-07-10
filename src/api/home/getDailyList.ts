import { ITokenHeader } from "@/modules/auth/hooks";
import axios from "axios";
import { APP_BASE_URL } from '../host';
export interface getDailyListParams {
    token: ITokenHeader
    start?: string;
    end?: string;
}

export const getDailyList = ({token, ...params}:getDailyListParams) => {
    return axios.get(APP_BASE_URL+"event", {
        headers: token,
        params
    })
}
