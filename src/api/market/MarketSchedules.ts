import { ITokenHeader } from '@/modules/auth/hooks'
import { ISchedule } from '@/utils/data'
import axios from 'axios'
import { APP_BASE_URL } from '../host'

export const getMarketSchedulesByCategory = async (token:ITokenHeader,category: string) => {
    return axios.get(`${APP_BASE_URL}schedule/${category}`, {
        headers: token,
        params:{}
    })
}