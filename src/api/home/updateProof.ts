import { ITokenHeader } from "@/modules/auth/hooks";
import axios from "axios";
import { APP_BASE_URL } from "../host";

export interface UpdateProofAPIProps {
    token: ITokenHeader
    userevent_id: string
    proof: number
    photo?: File
    diary?: string
}
export default function updateProof_api({token, userevent_id, ...rest}:UpdateProofAPIProps){
    return axios.patch(`${APP_BASE_URL}user/event/proof/${userevent_id}`,{
        ...rest
    },{
        headers: token
    })
}

