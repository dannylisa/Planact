import React from 'react';
import DateTimePicker, { Event } from '@react-native-community/datetimepicker';
import { Button, StyleSheet, View, Text, Platform } from 'react-native';
import { isToday } from '@/utils/date';
import TextButton from './TextButton';

interface DateTimePickerModalProps {
  mode: 'datetime' | 'date' | 'time';
  value: Date;
  onChange: (date: Date) => any;
  visible: boolean;
  hide: () => any;
  maximumDate?: Date;
  minimumDate?: Date;
}

export default function DateTimePickerModal(props:DateTimePickerModalProps){
    const {mode, value, onChange, visible, hide, minimumDate, maximumDate} = props;
    const { modal, container, text } = styles
    const onDateChange = (event:Event, date: Date | undefined) => onChange(date || new Date())
    return (
        <View style={[modal, {display: visible ? "flex" : "none"}]}>
            <View style={container}>
                {
                    minimumDate ?
                        maximumDate?
                        <Text style={text}>
                            {isToday(minimumDate) ? 
                                "오늘": `${minimumDate.getMonth()+1}월 ${minimumDate.getDate()}일`
                            }부터 
                            {isToday(maximumDate) ? 
                                " 오늘": ` ${maximumDate.getMonth()+1}월 ${maximumDate.getDate()}일`
                            }
                            까지 선택 가능합니다.
                        </Text> 
                        :
                        <Text style={text}>
                            {isToday(minimumDate) ? 
                                "오늘": `${minimumDate.getMonth()+1}월 ${minimumDate.getDate()}일`
                            }부터 선택 가능합니다.
                        </Text> 
                        :
                            <></>
                }
                <TextButton
                    color="#5796fa" 
                    content="완료" 
                    onPress={hide}/>
            </View>
            <DateTimePicker 
                display="spinner"
                value={value}
                testID="dateTimePicker"
                onChange={onDateChange}
                mode={mode} 
                maximumDate={maximumDate}
                minimumDate={minimumDate}
            /> 
        </View>
    )
}

const styles = StyleSheet.create({
  modal: {
    position: 'absolute',
    width: '100%',
    bottom: 0,
    backgroundColor: 'white',
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  text: {
    fontSize: 18,
    color: '#4a4a4a',
  },
});
