import React, { useMemo, useState } from "react"
import { Text, Button, TextInput, TextButton } from "@components/materials"
import { Alert, SafeAreaView, View } from "react-native"
import useTheme from "@/modules/theme/hooks"
import stepStyle from "./stepStyle"
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native"
import { ISchedule } from "@/utils/data"
import SelectDay from "./SelectDay"
import Slider from '@react-native-community/slider';

type FreqRouteParams = {
    Detail: {
        schedule: ISchedule
        alias: string
        start_at: string
        method?: {
            method: number
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
    
    const {container, text, buttonContainer, freqContainer,
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
            <View style={container}>
                <Text
                    bold 
                    content="플랜 적용 방식을 선택해주세요."
                    style={text}
                    marginBottom={100}
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


                <View style={buttonContainer}>
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