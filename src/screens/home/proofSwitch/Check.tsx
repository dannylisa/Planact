import React from "react";
import { Feather } from '@expo/vector-icons'
import { Alert, TouchableOpacity, View } from "react-native";
import { StyleSheet } from "react-native";
import { ProofProps } from ".";
import { SpecificColors } from "@/modules/theme/hooks";

const style = StyleSheet.create({
    container:{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    }
})
export default function({userschedule_id, userevent_id, updateProof, proof}:ProofProps){
    const { container } = style;
    const update = async (newProof: number) => {
        await updateProof({
            userschedule_id,
            userevent_id,
            proof:newProof,
            prev_proof: proof,
        }).then((res) => null)
        .catch((err) => Alert.alert("오류입니다."))
    }
    const onPress = async() => {
        if(proof === 0) 
            Alert.alert("계획 완료 상태로 변경하시겠습니까?",'',[
                { text: '취소', style: 'cancel'},  
                {text: '예', onPress: () => update(1)},
            ])
        else if(proof === 1)
            Alert.alert("계획을 실천하지 않은 상태로 변경하시겠습니까?",'',[
                {text: '취소', style: 'cancel'},  
                {text: '예', onPress: () => update(0)},
            ])
        else
            Alert.alert("계획을 실천하셨나요?",'',[
                {text: '아니요', onPress: () => update(0)},
                {text: '예', onPress: () => update(1)},  
            ])
        
    }

    const {blue, red} = SpecificColors;
    return (
        <View style={container}>
            {
                proof === null ?
                <TouchableOpacity onPress={onPress}>
                    <Feather name="square" size={26} color="#888" />
                </TouchableOpacity>
                :
                Number(proof) ?
                <TouchableOpacity onPress={onPress}>
                    <Feather name="check-square" size={26} color={blue} />
                </TouchableOpacity>
                :
                <TouchableOpacity onPress={onPress}>
                    <Feather name="x-square" size={26} color={red}/>
                </TouchableOpacity> 
            }
        </View>
    )
}

