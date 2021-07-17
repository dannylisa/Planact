import useTheme, { shadow } from "@/modules/theme/hooks";
import { useDailyUpdate } from "@/modules/userDailyList/hooks";
import { DefaultTheme } from "@/style/styled";
import React, { useEffect, useMemo, useState } from "react";
import { StyleSheet, View, SafeAreaView, ScrollView, Image, Alert } from "react-native";
import ProofSwitch, { proofMessage, ProofSwitchProps } from "../proofSwitch";
import { Button, GaugeBar, Text, TextInput } from "@components/materials";
import ContentParser from "./ContentParser";
import { NewScheduleComment, ScheduleCommentsList, useScheduleComments } from "@/components/scheduleComments";
import { useUserSchedule } from "@/modules/userSchedule/hooks";

export default function EventDetails({route}){
    const { userevent_id }= route.params
    const { getScheduleById } = useUserSchedule();
    const { getEventOfDailyById, updateProof } = useDailyUpdate()
    const userevent = getEventOfDailyById(userevent_id)
    const theme = useTheme();
    const { wrapper, header, contentWrapper, row, image } = useMemo(() => styles(theme), [theme]);
    
    if(!userevent) return <></>
    const {event: {schedule, title, proof_type, content}, proof, diary, photo} = userevent;
    const user_schedule = getScheduleById(schedule);

    const [initialProof, setInitialProof] = useState<number>(0)
    useEffect(() => {
        setInitialProof(+Boolean(proof))
    }, [])

    // Comments
    const {comments, resetComments, createComment} = useScheduleComments(schedule);
    const checkset: ProofSwitchProps = {
        proof_type,
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

        updateProof({
            userevent_id,
            proof:1,
            diary:newDiary
        });

        toggleDiaryMode()
        Alert.alert('기록 작성이 완료되었습니다.')
    }

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
                        num={
                            (user_schedule?.achievement || 0)
                            + (+Boolean(proof)-initialProof)
                        }
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
            padding: 18,
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
