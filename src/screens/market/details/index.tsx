import React, { useEffect } from "react"
import useTheme from "@/modules/theme/hooks";
import { Text } from '@components/materials';
import { View, StyleSheet, SafeAreaView } from "react-native";
import { getMarketScheduleEvents } from "@/api/market/";
import { useUserState } from "@/modules/auth/hooks";
import { useState } from "react";
import { IEvent, ISchedule } from "@/utils/data";
import { AxiosError, AxiosResponse } from "axios";
import { DefaultTheme } from "@/style/styled";

interface EventsGroupedByDateOf {
    date: string
    events: IEvent[]
}

export default function MarketScheduleDetails({ route }){
    const { schedule } = route.params
    const theme = useTheme()
    const { getToken } = useUserState();
    const { container, content } = styles(theme);
    const [schedulePreviewEvents, setSchedulePreviewEvents] = useState<EventsGroupedByDateOf | null>(null);

    useEffect(() => {
        (async () => {
            if(+schedule <= 0) return;
            const token = await getToken();
            if(!token) return;
            await getMarketScheduleEvents(schedule.id, token)
                .then((res:AxiosResponse<EventsGroupedByDateOf>) => {
                    setSchedulePreviewEvents(res.data)
                    console.log(res.data)
                })
                .catch((err:AxiosError) => console.log(err))
        })()
    }, [schedule])


    return(
        <SafeAreaView style={container}>
            <View style={content}>
                {schedule?
                <>
                    <Text flex={1} content={schedule.name} />
                </>
                    :
                    <Text content="Not Found"/>
                }
            </View>
        </SafeAreaView>
    )
}

const styles = ({mainBackground}:DefaultTheme) => StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: mainBackground
    },
    content:{
        flex: 1,
    }
})