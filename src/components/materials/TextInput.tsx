import React, { useMemo, useState } from "react";
import { DefaultTheme } from "@/style/styled";
import { NativeSyntheticEvent, StyleSheet, TextInputFocusEventData, TextInputProps } from "react-native";
import { TextInput as NativeTextInput } from "react-native-gesture-handler";
import useTheme from "@/modules/theme/hooks";

interface CustomedTextInputProps extends TextInputProps {
    underlined?: boolean
    flex?: number
}
export default function TextInput ({underlined, flex, onFocus, onBlur, style, ...others}:CustomedTextInputProps){
    const theme = useTheme();
    const {main, focused} = useMemo(() => styles(theme, underlined || false, flex || 0), [theme, underlined, flex])
    const [focus, setFocus] = useState<boolean>(false);
    const onfocused = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
        onFocus && onFocus(e);
        setFocus(true);
    }
    const onblur = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
        onBlur && onBlur(e);
        setFocus(false);
    }

    return (
        <NativeTextInput 
            style={ focus ? [main, focused, style] : [main, style]} 
            placeholderTextColor="#999"
            onFocus={onfocused}
            onBlur={onblur}
            {...others} 
            />
    )
}

const styles = ({text, primary:{main}}:DefaultTheme, underlined:boolean, flex?: number) => {
    const mainOps = underlined ? {
        borderBottomColor: '#cfcfcf',
        borderBottomWidth: 1.5,
    } : {
        borderColor: '#cfcfcf',
        borderWidth: 1.5,
    }
    const focusOps = underlined ? {
        borderBottomColor: main
    } : {
        borderColor: main
    }
    return StyleSheet.create({
        main: {
            backgroundColor: 'transparent',
            ...mainOps,
            color: text,
            fontSize: 18,
            fontWeight: "600",
            paddingTop: 10,
            paddingBottom: 10,
            paddingLeft: 14,
            paddingRight: 24,
            borderRadius: 2.5,
            flex: flex
        },
        focused: {
            color: text,
            ...focusOps
        }
    })
}