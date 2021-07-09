import { ITokenHeader } from '@/modules/auth/hooks'
import { IUserSchedule } from '@/utils/data'
import axios from 'axios'
import { APP_BASE_URL } from '../host';

export const getUserSchedule = (token:ITokenHeader) => {
  return axios.get<IUserSchedule[]>(APP_BASE_URL+'schedule', {
    headers: token
  })
}