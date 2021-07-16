import useTheme, { shadow } from "@/modules/theme/hooks";
import { useDailyUpdate } from "@/modules/userDailyList/hooks";
import { DefaultTheme } from "@/style/styled";
import React, { useMemo, useState } from "react";
import { StyleSheet, View, SafeAreaView, ScrollView, Image, Alert } from "react-native";
import ProofSwitch, { proofMessage, ProofSwitchProps } from "../proofSwitch";
import { Button, Text, TextInput } from "@components/materials";
import ContentParser from "./ContentParser";
import { NewScheduleComment, ScheduleCommentsList, useScheduleComments } from "@/components/scheduleComments";

export default function EventDetails({route}){
    const { userevent_id }= route.params
    const { getEventOfDailyById, updateProof } = useDailyUpdate()
    const userevent = getEventOfDailyById(userevent_id)
    const theme = useTheme();
    const { wrapper, header, contentWrapper, row, image } = useMemo(() => styles(theme), [theme]);
    
    if(!userevent) return <></>
    const {id, event: {seq, title, proof_type, content}, proof, diary, photo} = userevent;
    const {comments, resetComments, createComment} = useScheduleComments(id);
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
    console.log(photo)
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
                    schedule_id={id}
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
