import React, { useEffect, useMemo, useState } from "react"
import { View, StyleSheet, SafeAreaView, ScrollView, Alert } from "react-native";
import { DefaultTheme } from "@/style/styled";
import useTheme from "@/modules/theme/hooks";
import { Button, Text, useThemedStepper } from '@components/materials';
import { getMarketScheduleEvents, attachSchedule } from "@/api/market/";
import { useUserState } from "@/modules/auth/hooks";
import { IEvent, ISchedule } from "@/utils/data";
import { AxiosError, AxiosResponse } from "axios";
import EventPreview from "./EventPreview";


interface EventsGroupedByDateOf {
    date: string
    events: IEvent[]
}

export default function MarketScheduleDetails({ route, navigation }){
    // theme
    const theme = useTheme();
    const { container, header, content, stepperWrapper, item } = useMemo(() => styles(theme), [theme]);
    
    // Get Detail Data from api
    const { getToken } = useUserState();
    const schedule:ISchedule = route.params.schedule;
    const [schedulePreviewEvents, setSchedulePreviewEvents] = useState<EventsGroupedByDateOf[]>([]);
    const [stepperSize, setStepperSize] = useState<number>(3);

    // Stepper Setting
    const {StepperGetter, active} = useThemedStepper({size: stepperSize});
    const Stepper = useMemo(()=> StepperGetter(), [stepperSize, active, theme])


    // Initial Setting
    useEffect(() => {
        (async () => {
            if(+schedule <= 0) return;
            const token = await getToken();
            if(!token) return;
            await getMarketScheduleEvents(schedule.id, token)
                .then((res:AxiosResponse<EventsGroupedByDateOf[]>) => {
                    setSchedulePreviewEvents(res.data)
                    setStepperSize(Math.min(res.data.length, 5))
                })
                .catch((err:AxiosError) => console.log(err))
        })()
    }, [schedule])


    const onDownload = () => {
        navigation.push('Market/Schedule/Download', {
            schedule
        })
    }
    return(
        <SafeAreaView style={{flex: 1}}>
            <ScrollView style={container}>
                <View style={[item, header]}>
                    <View>
                        <Text 
                            bold headings={1} align="left" content={`${schedule.name}`} />
                        <Text
                            headings={3} 
                            align="left" 
                            marginVertical={10} 
                            content={schedule.description} 
                            />
                    </View>
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

                <View style={item}> 
                    <Button 
                        color="primary"
                        content="내 캘린더에 내려받기"
                        onPress={onDownload} 
                    />
                </View>
            </ScrollView>
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
        padding: 12,
        minHeight: 100,
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