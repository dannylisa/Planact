import { Foundation } from "@expo/vector-icons";
import React from "react";
import { Alert, TouchableOpacity } from "react-native";

interface ScoreProps {
    title: string
    proof: number | null
}
export default function ({title, proof}:ScoreProps) {
    const onPress = () => Alert.prompt(title, '숫자만 입력해 주세요.',(
        () => {
            
        }
    ))
    return  (
        <TouchableOpacity
            onPress={onPress}
        >
            <Foundation name="clipboard-pencil" size={24} />
        </TouchableOpacity>
    )
}