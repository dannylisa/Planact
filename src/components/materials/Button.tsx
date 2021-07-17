
import { GlobalState } from '@modules/index';
import { DefaultTheme } from '@/style/styled';
import React from 'react';
import { StyleSheet, TouchableOpacity, TouchableOpacityProps } from 'react-native'
import { useSelector } from 'react-redux';
import { isLight, shadow, SpecificColors } from "@modules/theme/hooks"
import { useMemo } from 'react';
import Text from "./Text"
import media from '@/style/media';

type ButtonColors =  "primary" | "secondary" | "ghost" | "danger";
interface ButtonProps extends TouchableOpacityProps{
    content: string
    color?: ButtonColors
    flex?: number
    headings?: number
}

const Button = function({color, flex, disabled, content, headings, style, ...others}:ButtonProps){
    const theme = useSelector(({theme}:GlobalState) => theme);
    const {container, text} = useMemo(() => styles(theme, color, flex || 0), [color, theme]);
  
    return(
    <TouchableOpacity 
        style={[container, style, {opacity: (disabled ? 0.6 : 1)}]} 
        disabled={disabled} 
        {...others}
    >
        <Text
            headings={headings || 2}
            content={content} 
            style={text} 
        />
    </TouchableOpacity>
  )
}

const styles = (theme:DefaultTheme, color?:ButtonColors, flex?:number) => {
    const dangerColors = isLight(theme) ? {
        main: theme.mainBackground,
        text: SpecificColors.red,
        border: SpecificColors.red
    } : {
        main: SpecificColors.red,
        text: theme.primary.text,
        border: "#ffffff00"
    }

    const {main, text, border} = color ? 
        color==="danger" ? 
            dangerColors 
        : theme[color] 
            : theme.primary;
    return StyleSheet.create({
        container: {
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: main,
            borderColor: border,
            borderWidth: 0,
            borderRadius: 5,
            padding: 10,
            flex: flex,
            ...shadow
        },
        text:{
            color: text,
            fontWeight: color==="danger" ? "800" : "500"
        },

    })
}

export default Button;
