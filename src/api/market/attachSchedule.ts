import { ITokenHeader } from "@/modules/auth/hooks"
import axios, { AxiosInstance } from "axios"
import dayjs from "dayjs"
import { Alert } from "react-native"
import { APP_BASE_URL } from "../host"

export type attachScheduleType = 'everyday' | 'interval' | 'weekdays';
interface AttachSchedulePropsBase {
    token: ITokenHeader;
    type: attachScheduleType
    schedule_id: string;
    alias: string;
    start_date: Date | string;
    color: string;
}

interface IntervalProps extends AttachSchedulePropsBase{
    interval: number
}

interface WeekdaysProps extends AttachSchedulePropsBase {
    weekdays: boolean[]
}

interface AttachScheduleProps extends AttachSchedulePropsBase, IntervalProps, WeekdaysProps{}


export default function (props:(AttachScheduleProps)): Promise<any> {
    let {type, interval, weekdays, start_date, ...others} = props;
    console.log(others.alias)
    if(others.color.indexOf("#")!==0 && 
        (others.color.length===7 || others.color.length===9)) 
        throw Error(`Not Color Type: ${others.color}`)
    start_date = dayjs(start_date).format('YYYY-MM-DD')

    return (
        type === 'weekdays'?
            attachScheduleWeekdays({...others, start_date, weekdays})
        :
        type === 'interval'?
            attachScheduleInterval({...others, start_date, interval})
            :
            attachScheduleEveryday({...others, start_date})
    )
}
const attachScheduleEveryday = async (props:Omit<AttachSchedulePropsBase, "type">) => {
    const {token, schedule_id, ...rest} = props;
    return axios.post(
        `${APP_BASE_URL}schedule/attach/${schedule_id}`,rest, {headers: token}
    )
}
const attachScheduleInterval = async (props:Omit<IntervalProps, "type">) => {
    const {token, schedule_id, ...rest} = props;
    return axios.post(
        `${APP_BASE_URL}schedule/attach/${schedule_id}`,rest, {headers: token}
    )
}

const attachScheduleWeekdays = async (props:Omit<WeekdaysProps, "type">) => {
    const {token, schedule_id, weekdays, ...rest} = props;
    const weekday = weekdays.map((bool, i) => bool ? i : -1).filter(i => i>=0).join('')
    return axios.post(
        `${APP_BASE_URL}schedule/attach/${schedule_id}`,{weekday, ...rest}, {headers: token}
    )
}