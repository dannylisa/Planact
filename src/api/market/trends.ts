import { ITokenHeader } from "@/modules/auth/hooks";
import axios from "axios";
import { APP_BASE_URL } from "../host";

export default function(token:ITokenHeader){
    return axios.get(APP_BASE_URL+"market/trends", {
        headers: token
    })
}