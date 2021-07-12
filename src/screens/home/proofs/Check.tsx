import React from "react";
import { Feather } from '@expo/vector-icons'
import { Alert, TouchableOpacity, View } from "react-native";
import { StyleSheet } from "react-native";
import { ProofProps } from ".";

const style = StyleSheet.create({
    container:{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    ok: {
        color: "#2783fb",
        margin: 4
    },
    not: {
        color: "#e92a2a",
        margin: 4
    },
    none:{
        color: "#888",
        margin: 4,
    }
})
export default function({userevent_id, updateProof, proof}:ProofProps){
    const { container, ok, not, none } = style;
    const update = async (newProof: number) => {
        await updateProof({
            userevent_id,
            proof:newProof,
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

    return (
        <View style={container}>
            {
                proof === null ?
                <>
                <TouchableOpacity onPress={onPress}>
                    <Feather style={none} name="square" size={26} />
                </TouchableOpacity>
                </>
                :
                proof ?
                <TouchableOpacity onPress={onPress}>
                    <Feather style={ok} name="check-square" size={26} />
                </TouchableOpacity>
                :
                !proof ?
                <TouchableOpacity onPress={onPress}>
                    <Feather style={not} name="x-square" size={26} />
                </TouchableOpacity>  : <></>
            }
        </View>
    )
}

