import { Dayjs } from 'dayjs';
import {isSolarHoliday} from 'holiday-kr';
import { daytype } from './data';

export const getDayType = (date:Dayjs):daytype => {
    // 0 : 평일 , 1: 토요일, 2: 일요일, 공휴일
    const day = date.get("day") ;
    if(day === 0 || isSolarHoliday(date.toDate()))
        return 2;
    else
        return day === 6 ? 1 : 0;
}

export const korday = ["일","월","화","수","목","금","토"] as const;

export const isToday = (date:Date) => {
    const today = new Date()
    return date.getDate() === today.getDate() && date.getMonth() === today.getMonth() && date.getFullYear() === today.getFullYear()
}