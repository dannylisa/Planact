import { DefaultTheme } from "@/style/styled";
import React, { useMemo } from "react";
import { Text } from '@components/materials';
import { Alert, StyleSheet, TouchableOpacity, View } from "react-native";
import useTheme from "@/modules/theme/hooks";
import { UpdateProofProps, useDailyUpdate } from "@/modules/userDailyList/hooks";
import ProofSwitch, { ProofSwitchProps } from "./proofSwitch";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from '@react-navigation/native';
import dayjs from "dayjs";

const EventItem = ({userschedule_id, userevent_id}:{userschedule_id:string, userevent_id:string}) => {
    const { getEventOfDailyById, updateProof } = useDailyUpdate()
    const userevent = getEventOfDailyById(userevent_id)

    const theme = useTheme();
    const { wrapper, textContainer, more } = useMemo(() => styles(theme), [theme]);
    
    if(!userevent) return <></>

    
    
    const {id, event: {seq, title, proof_type, origin_time}, proof, diary, photo} = userevent;
    const checkset: ProofSwitchProps = {
        proof_type,
        userschedule_id,
        userevent_id,
        updateProof,
        proof,
        diary,
        photo,
        title
    }
    
    const navigation = useNavigation()
    const toDetails = () => navigation.navigate('Event/Details', {userevent_id});
    return(
        <View style={wrapper}>
            <View style={textContainer}>
                {
                    origin_time ?
                    <Text bold flex={1.5} headings={2} content={origin_time.slice(0,5)}/>
                    :
                    <Text bold flex={1.5} headings={2} content={`${seq+1}.`}/>
                }
                <Text align="left" headings={2} flex={3.5} content={title} />
            </View>
            <ProofSwitch {...checkset}/>
            <TouchableOpacity 
                onPress={toDetails}
                style={more}
            >
                <Feather name="more-vertical" size={24} />
            </TouchableOpacity>
        </View>
    )
}

const styles = (theme:DefaultTheme) => {
    const { content } = theme;
    return StyleSheet.create({
        wrapper:{
            flexDirection: "row",
            height: 55,
            backgroundColor: content,
        },
        textContainer:{
            justifyContent: "center",
            alignItems: "center",
            flex: 4.5,
            flexDirection: "row"
        },
        more:{
            flex: 0.6,
            justifyContent: "center",
            alignItems: "center",
        }
    })
}
export default EventItem;
