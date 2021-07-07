import { IDailyList } from "@/utils/data";
import { Dayjs } from "dayjs";

export interface getDailyListParams {
    user_id: string;
    start: Dayjs;
    end: Dayjs;
}
export const getDailyList = async(params:getDailyListParams):Promise<IDailyList> => {
    return dailylist_dummy(params.start, params.end);
}


// schedule_id(더미 데이터) 1: 운동/헬스, 2: 영어공부 3: 수학공부
const dailylist_dummy = (start:Dayjs, end:Dayjs):IDailyList => {
    return {
        start, 
        end,
        data:[
            {
                date: start,
                events:[{
                    dateof: 1,
                    date: start,
                    title: "런닝머신 30분",
                    abb: "런닝머신",
                    content: "9km/h 5분 12km/h 5분 반복",
                    icon: "running",
                    completed: null,
                    schedule_id: "1",
                    seq: 1
                },
                {
                    dateof: 1,
                    title: "영단어 100개 암기",
                    content: "TOEIC 영단어 1~100",
                    abb: "영단어",
                    icon: "study",
                    date: start,
                    completed: null,
                    schedule_id: "2",
                    seq: 1
                }]
            },
            {
                date: start.add(1, 'days'),
                events:[{
                    dateof: 2,
                    title: "영단어 100개 암기",
                    content: "TOEIC 영단어 101~200",
                    abb: "영단어",
                    icon: "study",
                    date: start.add(1, 'days'),
                    completed: null,
                    schedule_id: "2",
                    seq: 1
                }]
            },
            {
                date: start.add(2, 'days'),
                events:[{
                    dateof: 3,
                    title: "영단어 100개 암기",
                    content: "TOEIC 영단어 201~300",
                    abb: "영단어",
                    icon: "study",
                    date: start.add(2, 'days'),
                    completed: null,
                    schedule_id: "2",
                    seq: 1
                },
                {
                    dateof: 4,
                    date: start,
                    title: "런닝머신 30분",
                    abb: "런닝머신",
                    content: "9km/h 5분 12km/h 5분 반복",
                    icon: "running",
                    completed: null,
                    schedule_id: "1",
                    seq: 1
                },
                {
                    dateof: 4,
                    date: start,
                    title: "스쿼트",
                    abb: "스쿼트",
                    content: "40kg 10개 2세트",
                    icon: "running",
                    completed: null,
                    schedule_id: "1",
                    seq: 2
                },
                {
                    dateof: 4,
                    date: start,
                    title: "스쿼트",
                    abb: "스쿼트",
                    content: "50kg 10개 2세트",
                    icon: "running",
                    completed: null,
                    schedule_id: "1",
                    seq: 3
                },
                {
                    dateof: 4,
                    date: start,
                    title: "스쿼트",
                    abb: "스쿼트",
                    content: "60kg 10개 2세트",
                    icon: "running",
                    completed: null,
                    schedule_id: "1",
                    seq: 4
                },
                {
                    dateof: 4,
                    date: start,
                    title: "스쿼트",
                    abb: "스쿼트",
                    content: "70kg 10개 2세트",
                    icon: "running",
                    completed: null,
                    schedule_id: "1",
                    seq: 5
                }
            ]
            },
            
        ]
    }
}