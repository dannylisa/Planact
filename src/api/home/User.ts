import { IUser } from '@/utils/data'

export interface getUserParams {
  user_id: string
}

export const getUser = async (): Promise<IUser> => {
  return user_dummy
}

export const user_dummy: IUser = {
  user_id: '1111',
  username: 'dummy',
}
