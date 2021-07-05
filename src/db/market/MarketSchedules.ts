import { ISchedule } from '@/utils/data'

export const getMarketSchedules = async (): Promise<ISchedule[]> => {
  return schedules_dummy
}

export const schedules_dummy: ISchedule[] = [
  {
    id: '1',
    name: 'health1',
    created_at: '#333333',
    updated_at: 'Lee Su young',
    icon: '광배근 기르기',
    proof_type: 'dd',
    category: 'fitness',
    description: 'dd',
    thumbnail: '',
    price: 3000,
    public: true,
  },
  {
    id: '2',
    name: 'health2',
    created_at: '#333333',
    updated_at: 'Lee Su young',
    icon: '이두박근 기르기',
    proof_type: 'dd',
    category: 'fitness',
    description: 'dd',
    thumbnail: '',
    price: 3000,
    public: true,
  },
  {
    id: '3',
    name: 'health3',
    created_at: '#333333',
    updated_at: 'Lee Su young',
    icon: '코어근육 기르기',
    proof_type: 'dd',
    category: 'fitness',
    description: 'dd',
    thumbnail: '',
    price: 3000,
    public: true,
  },
]
