import React, { useMemo } from "react";
import { StyleSheet, TouchableOpacity, TouchableOpacityProps } from "react-native";
import Text from "./Text"
import { DefaultTheme } from "@/style/styled";
import { useSelector } from "react-redux";
import { GlobalState } from "@/modules";
import { DefaultTextProps } from "./Text";

export interface TextButtonProps extends DefaultTextProps {
    underlined?: boolean
}
export default function TextButton({content, underlined, style, color, onPress, ...others}:TextButtonProps){
    const theme = useSelector(({theme}:GlobalState) => theme);
    const {container} = useMemo(() => styles(theme, underlined || false, color), [theme, underlined, color]);
    return(
        <TouchableOpacity onPress={onPress} style={[container, style]}>
            <Text content={content} color={color} {...others}/>
        </TouchableOpacity>
    )
}

const styles = ({text}:DefaultTheme, underlined:boolean, color?: string) => StyleSheet.create({
    container: {
        backgroundColor: 'transparent',
        borderBottomColor: color || text,
        borderBottomWidth: underlined ? 1 : 0,
    }
})