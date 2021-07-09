
import React, { useMemo } from "react";
import { StyleSheet, TouchableOpacity, TouchableOpacityProps, Text } from "react-native";
import { DefaultTheme } from "@/style/styled";
import { useSelector } from "react-redux";
import { GlobalState } from "@/modules";

interface TextButtonProps extends TouchableOpacityProps {
    content: string
}
export default function TextButton({content, style, ...others}:TextButtonProps){
    const theme = useSelector(({theme}:GlobalState) => theme);
    const {container, text} = useMemo(() => styles(theme), []);
    return(
        <TouchableOpacity {...others} style={[container, style]}>
            <Text style={text}>{content}</Text>
        </TouchableOpacity>
    )
}

const styles = ({text}:DefaultTheme) => StyleSheet.create({
    container: {
        backgroundColor: 'transparent',
        borderBottomColor: text,
        borderBottomWidth: 1,
        height: 20,
        paddingHorizontal: 5,
    },
    text: {
        color: text
    }
})