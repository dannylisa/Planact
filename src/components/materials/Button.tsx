
import { GlobalState } from '@modules/index';
import { DefaultTheme } from '@/style/styled';
import React from 'react';
import { StyleSheet, TouchableOpacity, TouchableOpacityProps, Text } from 'react-native'
import { useSelector } from 'react-redux';
import { shadow } from '@/style/style-util';
import { useMemo } from 'react';

interface ButtonProps extends TouchableOpacityProps{
    color?: "primary" | "secondary" | "ghost"
    content: string
}
const Button = function({color, disabled, content, style, ...others}:ButtonProps){
    const theme = useSelector(({theme}:GlobalState) => theme);
    const {container, text} = useMemo(() => styles(theme, color), [color]);
  return(
    <TouchableOpacity 
        style={[container, style, {opacity: (disabled ? 0.6 : 1)}]} 
        disabled={disabled} 
        {...others}
    >
        <Text style={text}>
            {content}
        </Text>
    </TouchableOpacity>
  )
}

type ButtonColors =  "primary" | "secondary" | "ghost";
const styles = (theme:DefaultTheme, color?:ButtonColors) => {
    const {main, text, border} = color ? theme[color] : theme.primary;
    return StyleSheet.create({
        container: {
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: main,
            borderColor: border,
            borderWidth: 0,
            borderRadius: 5,
            padding: 10,
            ...shadow
        },
        text:{
            fontSize: 20,
            color: text
        },

    })
}

export default Button;
