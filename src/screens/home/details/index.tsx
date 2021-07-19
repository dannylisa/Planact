import useTheme, { shadow } from "@/modules/theme/hooks";
import { UpdateProofProps, useDailyUpdate } from "@/modules/userDailyList/hooks";
import { DefaultTheme } from "@/style/styled";
import React, { useEffect, useMemo, useState } from "react";
import { StyleSheet, View, SafeAreaView, ScrollView, Image, Alert } from "react-native";
import ProofSwitch, { proofMessage, ProofSwitchProps } from "../proofSwitch";
import { Button, GaugeBar, Text, TextInput } from "@components/materials";
import ContentParser from "./ContentParser";
import { NewScheduleComment, ScheduleCommentsList, useScheduleComments } from "@/components/scheduleComments";
import { useUserSchedule } from "@/modules/userSchedule/hooks";
import { useNavigation } from "@react-navigation/native";
import dayjs from "dayjs";

export default function EventDetails({route}){
    const { userevent_id }= route.params
    const { getScheduleById } = useUserSchedule();
    const { getEventOfDailyById, getEventOfDailyBySeq, updateProof } = useDailyUpdate()
    const userevent = getEventOfDailyById(userevent_id)
    const theme = useTheme();
    const { wrapper, header, contentWrapper, row, image } = useMemo(() => styles(theme), [theme]);
    
    if(!userevent) return <></>
    const {event: {schedule, title, proof_type, content, seq}, date, proof, diary, photo} = userevent;
    const user_schedule = getScheduleById(schedule);

    // Comments
    const {comments, resetComments, createComment} = useScheduleComments(schedule);
    const checkset: ProofSwitchProps = {
        proof_type,
        userschedule_id:user_schedule?.id || "-1",
        userevent_id,
        updateProof,
        proof,
        diary,
        photo,
        title
    }
    const messages = useMemo(() => proofMessage(proof_type), [proof_type]);

    // Only for "DIARY"
    const [isDiaryWriteMode, setDiaryWriteMode] = useState<boolean>(false);
    const toggleDiaryMode = () => setDiaryWriteMode(prev => !prev)
    const [newDiary, setNewDiary] = useState<string>(diary || '')
    const writeDiary = () => {
        if(!isDiaryWriteMode)
            return toggleDiaryMode();

        const diff = dayjs().diff(date, 'days')
        if(diff>2){
            Alert.alert("이틀이 지난 일정은 기록할 수 없습니다.")
            return Promise.resolve(false)
        }
        else if(diff<0){
            Alert.alert("일정이 진행된 후에 기록을 남겨주세요!")
            return Promise.resolve(false)
        }

        updateProof({
            userschedule_id:user_schedule?.id || "-1",
            userevent_id,
            proof:1,
            prev_proof: proof,
            diary:newDiary
        });

        toggleDiaryMode()
        Alert.alert('기록 작성이 완료되었습니다.')
    }

    // 일정 간 이동
    const navigation = useNavigation();
    const prevEvent = useMemo(() => getEventOfDailyBySeq(seq-1)?.id || null, [userevent_id])
    const nextEvent = useMemo(() => getEventOfDailyBySeq(seq+1)?.id || null, [userevent_id])
    const onPrev = () => navigation.navigate('Event/Details', {userevent_id:prevEvent});
    const onNext = () => navigation.navigate('Event/Details', {userevent_id:nextEvent});

    console.log(prevEvent, nextEvent)
    return (
        <SafeAreaView style={{flex: 1, backgroundColor:"#dff", padding:0}}>
            <ScrollView style={wrapper}>
                <View style={header}>
                    <Text
                        align="left"
                        bold
                        headings={1}
                        content={title} 
                    />
                </View>
                {/* 컨텐츠 */}
                <ContentParser content={content} />
                
                {/* 성취율 */}
                <View style={contentWrapper}>
                    <Text
                        align="left"
                        bold
                        headings={1}
                        content="플랜 성취율"
                        marginBottom={10}
                    />
                    <GaugeBar 
                        num={user_schedule?.achievement || 0}
                        denom={(user_schedule?.schedule.count_events || 1)} />
                </View>

                {/* 인증 방식 */}
                <View style={contentWrapper}>
                    <Text
                        align="left"
                        bold
                        headings={1}
                        content="인증"
                    />
                    <View style={row}>
                        <Text
                            flex={6}
                            align="left"
                            headings={3}
                            content={proof ? messages[1]: messages[0]}
                            marginHorizontal={20}
                        />
                        <ProofSwitch
                            flex={1}
                            {...checkset}
                        />
                    </View>
                {photo &&     
                    <Image
                        style={image}
                        source={{
                            uri: photo,
                        }}
                    />
                }
                {proof_type==="DIARY" && (
                    !isDiaryWriteMode ?
                        diary ?
                        <Text
                            align="left"
                            content={diary} 
                            marginBottom={30}
                        /> : <></>
                    :
                    <TextInput 
                        multiline
                        style={{
                            minHeight: 200, 
                            marginBottom: 15,
                        }}
                        value={newDiary}
                        onChangeText={setNewDiary}
                    />
                )}
                {proof_type==="DIARY" &&
                    <Button 
                        color="primary"
                        content={isDiaryWriteMode ? 
                                    "작성 완료하기" : 
                                diary ? 
                                    "기록 수정하기" : 
                                    "기록 작성하기"
                                }
                        onPress={writeDiary}
                    />
                }
                </View>

                {/* 일정 간 이동 */}
                {
                    prevEvent && nextEvent && (
                    <View style={row}>
                        {prevEvent && (
                            <Button color="secondary" content="이전" />
                        )}
                        {nextEvent && (
                            <Button color="primary" content="다음" />
                        )}
                    </View>
                    )
                }

                {/* 댓글 */}
                <ScheduleCommentsList
                    style={contentWrapper}
                    schedule_id={schedule}
                    count_events={user_schedule?.schedule.count_events || 1}
                    comments={comments}
                    resetComments={resetComments}
                />
            </ScrollView>
            <NewScheduleComment
                floorFixed
                createComment={createComment}
                resetComments={resetComments} 
            />
        </SafeAreaView>
    )
}

const styles = (theme: DefaultTheme) => {
    return StyleSheet.create({
        wrapper: {
            flex: 1, 
            backgroundColor: theme.mainBackground,
            paddingBottom: 80
        },
        header:{
            paddingHorizontal: 12,
            paddingTop:15,
        },
        contentWrapper:{
            padding: 20,
        },
        row:{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            marginVertical: 10
        },
        image:{
            width: "100%", 
            aspectRatio: 16/9, 
            borderRadius: 15, 
        }
    })
}
