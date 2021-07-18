import React, { useMemo, useState } from "react"
import { Text, Button, TextButton } from "@components/materials"
import { Platform, SafeAreaView, View } from "react-native"
import useTheme from "@/modules/theme/hooks"
import stepStyle from "./stepStyle"
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native"
import { ISchedule } from "@/utils/data"
import { isToday, korday } from "@/utils/date"
import DateTimePickerModal from "@/components/materials/DateTimePickerModal"
import dayjs from "dayjs"

type StartAtRouteParams = {
    Detail: {
        schedule: ISchedule
        alias: string
        start_at?: string
    };
}

const Today = new Date()
const TwoWeeksLater = dayjs().add(14, 'days').toDate();

export default function StartAt () {
    const theme = useTheme()
    const {container, text, textInput, textButtonContainer, buttonContainer} = useMemo(() => stepStyle(theme), [theme])

    const {params} = useRoute<RouteProp<StartAtRouteParams, 'Detail'>>()
    const {schedule, alias} = params

    const [start_at, setStartAt] = useState<Date>(params.start_at ?new Date(params.start_at) : Today);
    const [datepickerVisible, setDatepickerVisible] = useState<boolean>(false);
    const toggleDatepickerVisible = () => setDatepickerVisible((prev) => !prev);
    
    const navigation = useNavigation();
    const onPrev = () => navigation.navigate('Market/Schedule/Download/alias', {schedule, alias})
    const onNext = () => navigation.navigate(
        'Market/Schedule/Download/freq', {
            schedule, 
            alias, 
            start_at:dayjs(start_at).format("YYYY-MM-DD")}
        )
    return (
        <SafeAreaView style={{flex:1}}>
            <View style={container}>
                <Text
                    bold 
                    content="언제부터 실천할 계획인가요?"
                    style={text}
                    marginBottom={100}
                />
                <View style={textButtonContainer}>
                    <TextButton
                        underlined={isToday(start_at)}
                        bold={isToday(start_at)}
                        color={isToday(start_at) ? theme.primary.main : theme.text}
                        headings={1}
                        content="오늘부터 하기!"
                        onPress={() => setStartAt(Today)}
                    />
                    <View style={{width:20}}/>
                    <TextButton
                        underlined={!isToday(start_at)}
                        bold={!isToday(start_at)}
                        color={!isToday(start_at) ? theme.primary.main : theme.text}
                        headings={1}
                        content={
                        isToday(start_at)
                            ? '나중에 시작할래요'
                            : `${start_at.getMonth() + 1}/${start_at.getDate()} (${
                                korday[start_at.getDay()]
                            }) 부터`
                        }
                        onPress={toggleDatepickerVisible}
                    />
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
            {Platform.OS === 'ios' && (
                <DateTimePickerModal
                value={start_at}
                onChange={setStartAt}
                mode="date"
                visible={datepickerVisible}
                hide={toggleDatepickerVisible}
                minimumDate={Today}
                maximumDate={TwoWeeksLater}
                />
            )}
        </SafeAreaView>
    )
}