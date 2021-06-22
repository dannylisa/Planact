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