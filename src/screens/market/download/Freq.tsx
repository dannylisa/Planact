import React, { useMemo, useState } from "react"
import { Text, Button, TextInput, TextButton } from "@components/materials"
import { Alert, SafeAreaView, StatusBar, View } from "react-native"
import useTheme, { isLight } from "@/modules/theme/hooks"
import stepStyle from "./stepStyle"
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native"
import { ISchedule } from "@/utils/data"
import SelectDay from "./SelectDay"
import Slider from '@react-native-community/slider';
import { attachScheduleType } from "@/api/market/attachSchedule"
import dayjs from "dayjs"
import { korday } from "@/utils/date"

type FreqRouteParams = {
    Detail: {
        schedule: ISchedule
        alias: string
        start_at: string
        method?: {
            methodIdx: number
            weekdays?: boolean[],
            interval?: number
        }
    };
}

const METHOD = ['요일 선택', '간격 선택', '매일 하기']
export default function Freq () {
    const theme = useTheme()
    const {params} = useRoute<RouteProp<FreqRouteParams, 'Detail'>>()
    const {schedule, alias, start_at, method} = params
    
    const {container, text, buttonContainer, freqContainer, rowInfo, rowContainer,
        textButtonContainer} = useMemo(() => stepStyle(theme), [theme])

    // Method
    const [methodIdx, setMethodIdx] = useState<number>(0);
    const select = (idx:number) => () => setMethodIdx(idx)
    
    // Interval Settings
    const [interval, setInterval] = useState<number>(method?.interval || 2);
    
    // Selected Days Settings
    const [weekdays, setWeekdays] = useState<boolean[]>(method?.weekdays || [
        false,false,false,false,false,false,false,
    ]);

    // calculate start, end date
    const getStartEndDate = () => {
        const type: attachScheduleType = methodIdx===0
          ? 'weekdays'
          : methodIdx===1
          ? 'interval'
          : 'everyday';
    
        let start_date = dayjs(start_at);
        const last = schedule.duration - 1;
    
        switch (type) {
          case 'weekdays':
            let days = weekdays
              .map((bool, i) => (bool ? (i + 1) % 7 : -1))
              .filter((i) => i >= 0);
            if (!days.length) return [start_date, dayjs(null)];
    
            while (!days.includes(start_date.day()))
              start_date = start_date.add(1, 'days');
            // 시작 날짜에 맞춰 요일 조정
            days = days.map((day) => (day - start_date.day() + 7) % 7).sort();
            const freq = days.length;
            const weeks = Math.floor(last / freq);
            const alpha = last % freq;
            return [start_date, start_date.add(weeks * 7 + days[alpha], 'days')];
          case 'interval':
            return [start_date, start_date.add(last * interval, 'days')];
          default:
            return [start_date, start_date.add(last, 'days')];
        }
      };
    
      const [start_date, end_date] = useMemo(
        () => getStartEndDate(),
        [start_at, methodIdx, interval, weekdays]
      );
    
    // Navigation
    const navigation = useNavigation();
    const onPrev = () => navigation.navigate('Market/Schedule/Download/startat', {schedule, alias, start_at})
    const onNext = () => {
        if(methodIdx === 0 &&  !weekdays.some(Boolean))
            return Alert.alert('요일을 선택해주세요!');
        navigation.navigate('Market/Schedule/Download/color', {
            schedule, 
            alias, 
            start_at, 
            method:{methodIdx, weekdays, interval}
        })
    }
    return (
        <SafeAreaView style={{flex:1}}>
            <StatusBar barStyle={isLight(theme) ? "dark-content" : "light-content"} />
            <View style={container}>
                <Text
                    bold 
                    content="플랜 적용 방식을 선택해주세요."
                    style={text}
                    marginBottom={5}
                />
                <Text
                    style={{width:"90%"}}
                    align="right"
                    content={`총 기간 ${schedule.duration}일`}
                    headings={1}
                    marginBottom={50}
                />
                <View style={textButtonContainer}>
                    {METHOD.map((method, idx) => (
                        <TextButton
                            key={idx}
                            underlined={methodIdx === idx}
                            bold={methodIdx === idx}
                            content={method}
                            headings={2}
                            marginHorizontal={3}
                            style={{marginHorizontal:18}}
                            onPress={select(idx)}
                        />
                    ))}
                </View>
                <View style={freqContainer}>
                {methodIdx === 0 ? (
                    <SelectDay
                        selectedDays={weekdays}
                        setSelectedDays={setWeekdays}
                    />
                    ) : 
                    methodIdx === 1 ? (
                        <>
                        <Slider
                            style={{flex: 2, marginLeft:20}}
                            minimumValue={2}
                            step={1}
                            maximumValue={10}
                            value={interval}
                            onValueChange={setInterval}
                            minimumTrackTintColor={theme.primary.main}
                            maximumTrackTintColor={theme.secondary.main}
                        />
                        <Text
                            flex={1.2}
                            headings={2}
                            marginHorizontal={20}
                            content={interval+"일마다 하기"} 
                        />
                        </>
                    ) 
                    : 
                    (
                        <Text
                            flex={1}
                            headings={2}
                            content={"매일 하기"} 
                        />
                    )}
                </View>

               {/* 날짜 보여주기 */}
                <View style={rowContainer}>
                    <View style={rowInfo}>
                        <Text headings={2} color={theme.disabled} content="시작 날짜" />
                        <Text
                        headings={2}
                        color={theme.disabled}
                        content={`${start_date.format('YYYY년 M월 D일')}(${
                            korday[start_date.day()]
                        })`}
                        />
                    </View>
                    <View style={rowInfo}>
                        <Text
                        headings={2}
                        color={theme.disabled}
                        content="종료 예상 날짜"
                        />
                        <Text
                        headings={2}
                        color={theme.disabled}
                        content={
                            end_date.isValid()
                            ? `${end_date.format('YYYY년 M월 D일')}(${
                                korday[end_date.day()]
                                })`
                            : '-'
                        }
                        />
                    </View>
                </View>

                <View style={[buttonContainer, {marginTop: 60}]}>
                    <Button
                        flex={1}
                        content="이전" 
                        color="secondary" 
                        onPress={onPrev}
                    />
                    <View style={{width:10}}/>
                    <Button 
                        flex={1}
                        content="다음" 
                        color="primary"
                        onPress={onNext}
                    />
                </View>
            </View>
        </SafeAreaView>
    )
}