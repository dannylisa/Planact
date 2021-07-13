import { DefaultTheme } from "@/style/styled";
import React, { useMemo } from "react";
import { Text } from '@components/materials';
import { StyleSheet, View } from "react-native";
import useTheme from "@/modules/theme/hooks";
import { Check, ProofProps, Score } from "./proofs";
import { useDailyUpdate } from "@/modules/userDailyList/hooks";


const EventDetails = ({userevent_id}:{userevent_id:string}) => {
    const { getEventOfDailyById, updateProof } = useDailyUpdate()
    const userevent = getEventOfDailyById(userevent_id)
    const theme = useTheme();
    const {wrapper, textContainer, proofContainer} = useMemo(() => styles(theme), [theme]);
    
    if(!userevent) return <></>
    const {id, event: {seq, title, proof_type}, proof, diary, photo} = userevent;
    const checkset: ProofProps = {
        userevent_id,
        updateProof,
        proof,
        diary,
        photo,
        title
    }
    return(
        <View style={wrapper}>
            <View style={textContainer}>
                <Text bold flex={1} headings={2} content={`${seq+1}.`}/>
                <Text align="left" headings={2} flex={3.5} content={title} />
            </View>
            <View style={proofContainer}>
                { proof_type === "BOOLEAN" ?
                    <Check {...checkset} />
                    :
                    <Score {...checkset}/>
                }
            </View>
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
            flex: 3,
            flexDirection: "row"
        },
        proofContainer: {
            flex: 1,
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
        }
    })
}
export default EventDetails;
