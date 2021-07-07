import { IEvent } from '@/utils/data'

export const getMarketEvents = async (): Promise<IEvent[]> => {
  return events_dummy
}

export const events_dummy: IEvent[] = [
  {
    id: 1,
    schedule_id: 2,
    dateof: 10203,
    seq: 2,
    title: '숄더프레스',
    abb: '숄더',
    content: '숄더프레스',
    proof_type: false,
    origin_time: '2021.7.5',
  },
  {
    id: 2,
    schedule_id: 2,
    dateof: 10203,
    seq: 2,
    title: '레그프레스',
    abb: '레그',
    content: '숄더프레스',
    proof_type: false,
    origin_time: '2021.7.5',
  },
  {
    id: 3,
    schedule_id: 2,
    dateof: 10203,
    seq: 2,
    title: '레그레이즈',
    abb: '레그',
    content: '레그레이즈',
    proof_type: false,
    origin_time: '2021.7.5',
  },
]
