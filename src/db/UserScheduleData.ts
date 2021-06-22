import { ISchedule } from "@/utils/data";

export const getUserSchedule = async(user_id: string):Promise<ISchedule[]> => {
    return schedules_dummy;
}


// schedule_id(더미 데이터) 1: 운동/헬스, 2: 영어공부 3: 수학공부
const schedules_dummy:ISchedule[] =[
    {
        schedule_id: "1",
        color: "#ffc8c8",
        publisher: "swimmie",
        topic: "헬스",
    },
    {
        schedule_id: "2",
        color: "#bbbbff",
        publisher: "swimmie",
        topic: "영어",
    },
    {
        schedule_id: "3",
        color: "#bbffbb",
        publisher: "swimmie",
        topic: "수학",
    },
]