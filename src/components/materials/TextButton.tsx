
import React, { useMemo } from "react";
import { StyleSheet, TouchableOpacity, TouchableOpacityProps } from "react-native";
import Text from "./Text"
import { DefaultTheme } from "@/style/styled";
import { useSelector } from "react-redux";
import { GlobalState } from "@/modules";
import { DefaultTextProps } from "./Text";

interface TextButtonProps extends DefaultTextProps {
    underlined?: boolean
}
export default function TextButton({content, underlined, style, onPress, ...others}:TextButtonProps){
    const theme = useSelector(({theme}:GlobalState) => theme);
    const {container, text} = useMemo(() => styles(theme, underlined || false), [theme]);
    return(
        <TouchableOpacity onPress={onPress} style={[container, style]}>
            <Text content={content} style={text} {...others}/>
        </TouchableOpacity>
    )
}

const styles = ({text}:DefaultTheme, underlined:boolean) => StyleSheet.create({
    container: {
        backgroundColor: 'transparent',
        borderBottomColor: text,
        borderBottomWidth: underlined ? 1 : 0,
        height: 20,
        paddingHorizontal: 5,
    },
    text: {
        color: text
    }
})