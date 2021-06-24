import { IDaily, daytype } from '@/utils/data';
import { getDayType } from '@/utils/date';
import React from 'react';
import EventView from './EventView';
import { StyleSheet, TouchableOpacity, Text } from 'react-native'
import { useSelector } from 'react-redux';
import { DefaultTheme } from '@/style/styled';
import { isLight } from '@/style/themes';
import { GlobalState } from '@modules/index';
import { shadow } from '@/style/style-util';

interface DailyProps extends IDaily {
    onPress : () => void
}
function Daily ({date, events, onPress}:DailyProps) {
    const {theme, userSchedules} = useSelector((state:GlobalState) => state);
    const daytype:daytype = getDayType(date);
    const {container, datetext, extra} = styles(theme, {daytype});
    return (
        <TouchableOpacity style={container} onPress={onPress}>
            <Text style={datetext}>
                { date.date() > 1 ? date.date() : `${date.month()+1}.${date.date()}`}
            </Text>
            {
                events
                    .filter((_, i) => i<3)
                    .map( (event, idx) => 
                        <EventView 
                            key={idx} 
                            {...event}
                        />)
            }
            {
                events.length > 3 && 
                    <Text style={extra}> 
                        +{events.length-3} 
                    </Text>
            }
        </TouchableOpacity>)
}

interface DailyStyleProps {
    daytype: daytype
}

const styles = (theme:DefaultTheme, {daytype}:DailyStyleProps) => {
    const { content, text } = theme;
    const shadowOption = isLight(theme) ? shadow : {};
    const blue = "#1663f1";
    const red = "#f02323d2" ;
    return StyleSheet.create({
        container:{
            backgroundColor: content,
            width: 120,
            height: 120,
            padding: 5,
            paddingTop: 3,
            borderRadius: 17,
            marginRight: 8,
            ...shadowOption
        },
        datetext: {
            color: daytype === 0 ? text : daytype === 1 ? blue : red,
            fontWeight: '800',
            fontSize: 20,
        },
        extra:{
            textAlign: "center"
        }
    })
}


export default Daily;