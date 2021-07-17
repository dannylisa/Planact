import { ITokenHeader } from "@/modules/auth/hooks";
import convertURLtoImage from "@/utils/convertURLtoImage";
import axios from "axios";
import { APP_BASE_URL } from "../host";
import FormData from 'form-data'

export interface UpdateProofAPIProps {
    token: ITokenHeader
    userschedule_id: string
    userevent_id: string
    proof: number
    photo?: string
    diary?: string
}
export default async function updateProof_api({token, userschedule_id, userevent_id, photo, ...rest}:UpdateProofAPIProps){
    const api = `${APP_BASE_URL}user/event/proof/${userschedule_id}/${userevent_id}`;
    if(photo){
        const fd = new FormData();
        //FormData에 key, value 추가하기
        fd.append('proof', "1")
        fd.append('photo', {
            uri: photo,
            name: 'user_proof_5',
            type: "image/jpg"
        });
        return axios.patch(api, fd, {
            headers: token
        })
    }
    return axios.patch(api,{
        ...rest
    },{
        headers: token
    })
}

