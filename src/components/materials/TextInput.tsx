import React, { useMemo, useState } from "react";
import { DefaultTheme } from "@/style/styled";
import { NativeSyntheticEvent, StyleSheet, TextInputFocusEventData, TextInputProps } from "react-native";
import { TextInput as OriginTextInput } from "react-native-gesture-handler";
import useTheme from "@/modules/theme/hooks";

export default function TextInput ({onFocus, onBlur, style, ...others}:TextInputProps){
    const theme = useTheme();
    const {main, focused} = useMemo(() => styles(theme), [theme])
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
        <OriginTextInput 
            style={ focus ? [style, main, focused] : [style, main]} 
            onFocus={onfocused}
            onBlur={onblur}
            {...others} 
            />
    )
}

const styles = ({mainBackground, text, primary:{main}}:DefaultTheme) => StyleSheet.create({
    main: {
        backgroundColor: mainBackground,
        borderColor: '#cfcfcf',
        borderWidth: 1.5,
        color: text,
        height: 35,
        fontSize: 18,
        paddingVertical: 20,
        paddingLeft: 18,
        paddingRight: 24,
        borderRadius: 2.5,
    },
    focused: {
        borderColor: main,
    }
})