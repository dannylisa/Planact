import axios from "axios";
import { UserProps } from "@modules/auth";
import { ITokenHeader } from "@/modules/auth/hooks";
import { HOST } from "./host";

const AUTH_BASE_URL = HOST("account/auth/");
export interface LoginProps {
    username: string
    password: string
}

export interface SignUpProps {
    username: string;
    password: string;
    password2: string;
}

export const login_api = ({username, password}:LoginProps) => {
    return axios.post<UserProps>(AUTH_BASE_URL +"login",{
        username,
        password
    })
}

export const signup_api = ({username, password}:LoginProps) => {
    return axios.post(AUTH_BASE_URL+"register",{
        username,
        password
    })
}

export const logout_api = (tokenHeader:ITokenHeader) => {
    return axios.post(AUTH_BASE_URL+"logout/",{},{
        headers: tokenHeader
    })
}

export const validate_api = async (tokenHeader:ITokenHeader) => {
    let succeed = false;
    await axios.get(AUTH_BASE_URL+"user",{
        headers: tokenHeader
    }).then((res) => {
        succeed = (res.status === 200)
    })
    return succeed
}