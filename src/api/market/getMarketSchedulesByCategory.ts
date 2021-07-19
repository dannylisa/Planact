import { ITokenHeader } from '@/modules/auth/hooks'
import axios from 'axios'
import { APP_BASE_URL } from '../host'

export default (token:ITokenHeader,category: string, page:number) => {
    return axios.get(`${APP_BASE_URL}schedule/${category}?page=${page}`, {
        headers: token,
        params:{}
    })
}