import React, { useMemo, useState } from "react";
import { DefaultTheme } from "@/style/styled";
import { NativeSyntheticEvent, StyleSheet, TextInputFocusEventData, TextInputProps, View } from "react-native";
import { TextInput as OriginTextInput } from "react-native-gesture-handler";
import useTheme from "@/modules/theme/hooks";
import { AntDesign } from "@expo/vector-icons";

export default function SearchtInput ({onFocus, onBlur, style, ...others}:TextInputProps){
    const theme = useTheme();
    const {icon, main, focused} = useMemo(() => styles(theme), [theme])
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
        <View>
            <AntDesign 
                name="search1" 
                style={icon} 
                color={focus ? theme.primary.main : theme.disabled}
                size={24}/>
            <OriginTextInput 
                style={ focus ? [main, focused, style] : [main, style]} 
                placeholderTextColor={theme.disabled}
                onFocus={onfocused}
                onBlur={onblur}
                {...others} 
                />
        </View>
    )
}

const styles = ({text, disabled, primary:{main}}:DefaultTheme) => StyleSheet.create({
    icon: {
        position: "absolute",
        left: 18,
        top: 20,
    },
    main: {
        backgroundColor: 'transparent',
        borderBottomColor: disabled,
        borderWidth:0,
        borderBottomWidth: 1.5,
        color: text,
        fontSize: 18,
        paddingVertical: 12,
        paddingLeft: 42,
        paddingRight: 24,
        borderRadius: 2.5,
        margin: 7
    },
    focused: {
        borderWidth:0,
        borderBottomColor: main,
        borderBottomWidth: 2,
        color: text,
    }
})