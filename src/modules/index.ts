import { useSelector } from 'react-redux';
import { combineReducers, createStore } from 'redux';
import theme from './theme';
import userSchedules from './userSchedules';

const rootReducer = combineReducers({
    theme,
    userSchedules
});
export type GlobalState = ReturnType<typeof rootReducer>;
export default createStore(rootReducer);


export const getScheduleById = (schedule_id:string) => {
    const schedules = useSelector(({userSchedules}:GlobalState) => userSchedules);
    return schedules.find(schedule => schedule.schedule_id == schedule_id);
}
