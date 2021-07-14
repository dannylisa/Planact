import React, { useEffect, useMemo, useState } from "react"
import { View, StyleSheet, SafeAreaView, Button as NativeButton, ScrollView, Alert } from "react-native";
import { DefaultTheme } from "@/style/styled";
import useTheme from "@/modules/theme/hooks";
import { Button, Text, TextInput, useThemedStepper } from '@components/materials';
import { getMarketScheduleEvents, attachSchedule } from "@/api/market/";
import { useUserState } from "@/modules/auth/hooks";
import { IEvent, ISchedule } from "@/utils/data";
import { AxiosError, AxiosResponse } from "axios";
import EventPreview from "./EventPreview";
import { RadioButtonProps, RadioButton } from 'react-native-radio-buttons-group';
import SelectDay from "./SelectDay";
import DateTimePickerModal from "@/components/materials/DateTimePickerModal";
import { isToday } from "@/utils/date";
import dayjs from "dayjs";
import SelectInterval from "./SelectInterval";
import { attachScheduleType } from "@/api/market/attachSchedule";


interface EventsGroupedByDateOf {
    date: string
    events: IEvent[]
}


const RADIO_PROPS:RadioButtonProps[] = [
    {label: '요일 선택', id: "0", selected: true},
    {label: '간격 선택', id: "1", selected: false},
    {label: '매일 하기', id: "2", selected: false},
]

const Today = new Date();
const TwoWeeksLater = dayjs().add(14, 'days').toDate();

export default function MarketScheduleDetails({ route }){
    // theme
    const theme = useTheme();
    const { container, header, buttonContainer, downloadContainer,
        button, content, stepperWrapper, item } = useMemo(() => styles(theme), [theme]);
    
    // Get Detail Data from api
    const { getToken } = useUserState();
    const schedule:ISchedule = route.params.schedule;
    const [schedulePreviewEvents, setSchedulePreviewEvents] = useState<EventsGroupedByDateOf[]>([]);
    const [stepperSize, setStepperSize] = useState<number>(3);

    // Stepper Setting
    const {StepperGetter, active} = useThemedStepper({size: stepperSize});
    const Stepper = useMemo(()=> StepperGetter(), [stepperSize, active, theme])

    // DatePicker Setting
    const [date, setDate] = useState<Date>(Today)
    const [datepickerVisible, setDatepickerVisible] = useState<boolean>(false)
    const toggleDatepickerVisible = () => setDatepickerVisible(prev => !prev)
    const [selectedDays, setSelectedDays] = useState<boolean[]>(
        [false,false,false,false,false,false,false]
    );

    // Radio Button Settings
    const [radioButtons, setRadioButtons] = useState<RadioButtonProps[]>(
        RADIO_PROPS.map(prop => ({
            ...prop, 
            labelStyle: {
                color: theme.text,
                fontSize: 16,
            }
        }))
    )
    const onPressRadioButton = (idx: number) => (
        setRadioButtons(prev => {
            return prev.map((item, index) => ({...item, selected: index===idx}))
        })
    );


    // Interval Settings
    const [interval, setInterval] = useState<number>(2);
    const [intervalSelectionVisible, setIntervalSelectionVisible] = useState<boolean>(false)
    const toggleIntervalSelectionVisible = () => (
        setIntervalSelectionVisible(prev => !prev)
    );

    // Set alias
    const [alias, setAlias] = useState<string>(schedule.abb)
    const onSetAlias = () => {
        Alert.prompt('스케줄의 별명을 지어주세요.', '', setAlias)
    }

    // Initial Setting
    useEffect(() => {
        (async () => {
            if(+schedule <= 0) return;
            const token = await getToken();
            if(!token) return;
            await getMarketScheduleEvents(schedule.id, token)
                .then((res:AxiosResponse<EventsGroupedByDateOf[]>) => {
                    console.log(res.data)
                    setSchedulePreviewEvents(res.data)
                    setStepperSize(Math.min(res.data.length, 5))
                })
                .catch((err:AxiosError) => console.log(err))
        })()
    }, [schedule])

    
    // Use attatch api
    const attach = async () => {
        const token = await getToken();
        if(!token) return;
        const type:attachScheduleType = 
            radioButtons[0].selected ? 'weekdays' 
            : radioButtons[1].selected ? 'interval' 
            : 'everyday';
        
        if(type === "weekdays" && selectedDays.every(i => !i))
            return Alert.alert("요일을 선택해주세요!")

        await attachSchedule({
                type,
                token,
                alias,
                interval,
                weekdays: selectedDays,
                start_date: date,
                color: "#ffaaaa",
                schedule_id: schedule.id
            }).then((res) => {
                console.log(res);
                Alert.alert("플랜이 다운로드 되었습니다.")
            }).catch((err:AxiosError) => {
                console.log(err)
                console.log(err.response)
                if(err.response?.status === 406)
                    Alert.alert("이미 내려받은 스케줄입니다!")
                else
                    Alert.alert(err.response?.data)
            })
    }

    return(
        <SafeAreaView style={{flex: 1}}>
            <ScrollView style={container}>
                <View style={[item, header]}>
                    <View>
                        <Text bold headings={1} align="left" content={`${schedule.name}(${alias})`} />
                        <Text headings={3} align="left" marginVertical={10} content={schedule.description} />
                    </View>
                    <NativeButton title="별명 설정" onPress={onSetAlias} />
                </View>
                {/* Stepper */}
                <View style={stepperWrapper} >
                    {Stepper}
                </View>
                <View style={content}>
                    {   schedulePreviewEvents.length ?
                        schedulePreviewEvents[active].events.map(
                            (event, idx) => (
                                <EventPreview event={event} key={idx} />
                            )
                        )
                        : <></>
                    }
                </View>

                {/* 요일 / 간격 선택 */}
                <View style={[item]}> 
                    {
                        radioButtons.map((radio, idx) => (
                            <RadioButton 
                                key={idx}
                                {...radio}
                                color={theme.primary.main}
                                labelStyle={{color: theme.text}}
                                onPress={() => onPressRadioButton(idx)}
                            />
                        ))
                    }
                </View>
                <View style={item}> 
                  {radioButtons[0].selected?
                    <SelectDay
                        selectedDays={selectedDays}
                        setSelectedDays={setSelectedDays} 
                    />
                    :<></>
                  }
                  {
                      radioButtons[1].selected?
                      <>
                          <Text 
                            headings={1} 
                            content={`${interval}일마다 한 번 실천하기`}
                            marginHorizontal={10}
                        />
                          <NativeButton 
                            title={
                                !intervalSelectionVisible? "변경": "완료"
                            } 
                            onPress={toggleIntervalSelectionVisible} 
                            />
                        </>
                      :<></>
                  }
                  {
                      radioButtons[2].selected?
                        <Text headings={1} content={`매일 실천하기`} />
                      :<></>
                  }
                </View>


                {/* 시작 날짜 선택 */}
                <View style={buttonContainer}>   
                  <Button 
                    style={button} 
                    color={ isToday(date) ? "primary" : "ghost"} 
                    content="오늘부터 하기!" 
                    onPress={() => setDate(Today)}/>
                  <Button 
                    style={button} 
                    color={ !isToday(date) ? "primary" : "ghost"}  
                    content={isToday(date) ? "나중에 시작할게요" : `${date.getMonth()+1}월 ${date.getDate()}일부터`} 
                    onPress={toggleDatepickerVisible}/>
                </View>

                <View style={item}> 
                    <Button 
                        color="primary"
                        content="다운로드"
                        onPress={attach} 
                    />
                </View>
            </ScrollView>
            <SelectInterval 
                value={interval}
                onValueChange={setInterval}
                visible={intervalSelectionVisible}
                hide={toggleIntervalSelectionVisible}
            />
            <DateTimePickerModal 
                value={date} 
                onChange={setDate} 
                mode="date" 
                visible={datepickerVisible}
                hide={toggleDatepickerVisible}
                minimumDate={Today}
                maximumDate={TwoWeeksLater}
            /> 
        </SafeAreaView>
    )
}

const styles = ({mainBackground}:DefaultTheme) => StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: mainBackground,
        padding:20
    },
    header: {
        justifyContent: "space-between", 
        padding: 15,
        height: 80,
    },
    buttonContainer:{
        flexDirection: "row",
        marginBottom: 15
    },
    downloadContainer:{
        padding: 10,
        position: "absolute",
        width: "100%",
        bottom: 0,
    },
    button:{
        flex: 1,
        margin: 8
    },
    stepperWrapper:{
        flex: 1,
        marginBottom: 16
    },
    content:{
        paddingHorizontal: 16
    },
    selectStartDay:{
        height: 60,
        paddingVertical:5,
        flexDirection: "row",
        justifyContent: "space-around"
    },
    item:{
        height: 55,
        marginBottom: 20,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center"
    }
})