import React, { useEffect, useMemo, useState } from "react"
import { View, StyleSheet, SafeAreaView, ScrollView, Alert } from "react-native";
import { DefaultTheme } from "@/style/styled";
import useTheme from "@/modules/theme/hooks";
import { Button, Text, TextInput, useThemedStepper } from '@components/materials';
import { getMarketScheduleEvents, attachSchedule, getScheduleComment, createScheduleComment } from "@/api/market/";
import { useUserState } from "@/modules/auth/hooks";
import { IEvent, ISchedule, IScheduleComment } from "@/utils/data";
import { AxiosError, AxiosResponse } from "axios";
import EventPreview from "./EventPreview";
import Comment from './Comment';


interface EventsGroupedByDateOf {
    date: string
    events: IEvent[]
}

export default function MarketScheduleDetails({ route, navigation }){
    // theme
    const theme = useTheme();
    const { container, header, content, stepperWrapper, item, commentContainer, newCommentContainer } = useMemo(() => styles(theme), [theme]);
    
    // Get Detail Data from api
    const { getToken } = useUserState();
    const schedule:ISchedule = route.params.schedule;
    const [schedulePreviewEvents, setSchedulePreviewEvents] = useState<EventsGroupedByDateOf[]>([]);
    const [stepperSize, setStepperSize] = useState<number>(3);

    // Comments
    const [newComment, setNewComment] = useState<string>('');
    const [comments, setComments] = useState<IScheduleComment[]>([]);
    const resetComments = async () => {
        const token = await getToken();
        if(!token) return;
        await getScheduleComment(token, schedule.id)
            .then((res:AxiosResponse<IScheduleComment[]>) => {
                setComments(res.data)
            }).catch((err:AxiosError) => Alert.alert("서버 오류입니다."));
    }
    const createComment = async () => {
        const token = await getToken();
        if(!token) return;
        if(!newComment) return Alert.alert("댓글을 입력해주세요.")
        await createScheduleComment(token, schedule.id, newComment)
            .then((res:AxiosResponse<IScheduleComment[]>) => {
                resetComments()
            }).catch((err:AxiosError) => {
                Alert.alert("서버 오류입니다.")
            });
    }

    // Stepper Setting
    const {StepperGetter, active} = useThemedStepper({size: stepperSize});
    const Stepper = useMemo(()=> StepperGetter(), [stepperSize, active, theme])


    // Initial Setting
    useEffect(() => {
        (async () => {
            const token = await getToken();
            if(!token) return;
            await getMarketScheduleEvents(token, schedule.id)
                .then((res:AxiosResponse<EventsGroupedByDateOf[]>) => {
                    setSchedulePreviewEvents(res.data)
                    setStepperSize(Math.min(res.data.length, 5))
                })
                .catch((err:AxiosError) => console.log(err))
        })();
        resetComments();
    }, [schedule])


    const onDownload = () => navigation.push('Market/Schedule/Download', {schedule})

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
                    {
                        false ?
                        // schedule.has_attached ?
                        <Button
                            color="secondary"
                            content="현재 진행중인 플랜입니다."
                            disabled
                        />
                        :
                        <Button 
                            color="primary"
                            content="내 캘린더에 내려받기"
                            onPress={onDownload} 
                        />
                    }
                </View>
                <View style={commentContainer}>
                    <Text
                        headings={1} 
                        bold
                        align="left" 
                        content="댓글"
                        marginBottom={10}
                    />
                    {
                        comments.map((comment, idx) => (
                            <Comment comment={comment} key={idx}/>
                        ))
                    }
                </View>
            </ScrollView>
            <View style={newCommentContainer}>
                <TextInput
                    flex={4}
                    underlined
                    placeholder="댓글을 입력하세요!"
                    value={newComment}
                    onChangeText={setNewComment}
                />
                <View style={{padding: 5, flex: 1}}>
                    <Button
                    color="primary"
                    content="입력"
                    onPress={createComment}
                    />
                </View>
            </View>
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
    },
    commentContainer: {
        marginTop: 10
    },
    newCommentContainer:{
        position: "absolute",
        flexDirection: "row",
        bottom: 0,
        height: 80,
        width: "100%",
        padding: 12
    }
})