import useTheme from "@/modules/theme/hooks";
import {  useDailyUpdate } from "@/modules/userDailyList/hooks";
import { DefaultTheme } from "@/style/styled";
import React, { useMemo, useState } from "react";
import { StyleSheet, View, SafeAreaView, ScrollView, Image, Alert } from "react-native";
import ProofSwitch, { proofMessage, ProofSwitchProps } from "../proofSwitch";
import { Button, Text, TextInput } from "@components/materials";
import ContentParser from "./ContentParser";
import { useUserSchedule } from "@/modules/userSchedule/hooks";
import { useNavigation } from "@react-navigation/native";
import dayjs from "dayjs";

export default function EventDetails({route}){
    const { userevent_id }= route.params
    const { getScheduleById } = useUserSchedule();
    const { getEventOfDailyById, getEventOfDailyByScheduleAndSeq, updateProof } = useDailyUpdate()
    const userevent = getEventOfDailyById(userevent_id)
    const theme = useTheme();
    const { wrapper, header, contentWrapper, row, image, emptyImage } = useMemo(() => styles(theme), [theme]);
    
    if(!userevent) return <></>
    const {event: {schedule, title, proof_type, content, seq}, date, proof, diary, photo} = userevent;
    const user_schedule = getScheduleById(schedule);

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
    const prevEvent = useMemo(() => {
        const event = getEventOfDailyByScheduleAndSeq(user_schedule?.schedule.id , seq-1)
        return event ? {id: event.id, name: event.event.title} : null
    }, [userevent_id])
    const nextEvent = useMemo(() => {
        const event = getEventOfDailyByScheduleAndSeq(user_schedule?.schedule.id, seq+1)
        return event ? {id: event.id, name: event.event.title} : null    }, [userevent_id])
    const onPrev = () => navigation.navigate('Event/Details', {userevent_id:prevEvent?.id});
    const onNext = () => navigation.navigate('Event/Details', {userevent_id:nextEvent?.id});

    return (
        <SafeAreaView style={{flex: 1, backgroundColor:"#dff", padding:0}}>
            <ScrollView style={wrapper}>
                <View style={header}>
                    <Text
                        align="left"
                        bold
                        style={{fontSize:28}}
                        content={title} 
                    />
                </View>
                {/* 컨텐츠 */}
                <View style={{paddingHorizontal:5}}>
                    <ContentParser content={content} />
                </View>
                
                {/* 인증 방식 */}
                {
                    proof_type !== 'NONE' && (
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
                    {photo ?    
                        <Image
                            style={image}
                            source={{
                                uri: photo,
                            }}
                        />
                        : proof_type==="PHOTO" ?
                        <View style={[image, emptyImage]} >
                            <Text
                                bold
                                headings={1}
                                content="인증 사진을 업로드해주세요!" 
                            />
                        </View> :<></>
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
                        
                    )
                }

                {/* 일정 간 이동 */}
                {
                    (prevEvent || nextEvent) && (
                    <View style={[row, {width:"100%", paddingHorizontal:20}]}>
                        {prevEvent && (
                            <Button 
                                flex={1}
                                color="secondary" 
                                content={"◀   " + prevEvent.name}
                                onPress={onPrev}
                            />
                        )}
                        {prevEvent && nextEvent && (
                            <View style={{width:10}} />
                        )}
                        {nextEvent && (
                            <Button 
                                flex={1}
                                color="primary" 
                                content={nextEvent.name + "   ▶"}
                                onPress={onNext}
                            />
                        )}
                    </View>
                    )
                }
            </ScrollView>
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
            paddingHorizontal: 15,
            paddingTop:18,
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
            aspectRatio: 16/12, 
            borderRadius: 15, 
        },
        emptyImage:{
            backgroundColor: theme.secondary.main+"70",
            justifyContent:"center",
            alignItems:"center"
        }
    })
}
