
import { GlobalState } from '@modules/index';
import { DefaultTheme } from '@/style/styled';
import React from 'react';
import { StyleSheet, TouchableOpacity, TouchableOpacityProps, Text } from 'react-native'
import { useSelector } from 'react-redux';

interface ButtonProps extends TouchableOpacityProps{
    color?: "primary" | "secondary" | "ghost"
    content: string
}
const Button = function({color, disabled, content, ...others}:ButtonProps){
    const theme = useSelector(({theme}:GlobalState) => theme);
    const {container, text} = styles(theme, {color, disabled});
  return(
    <TouchableOpacity 
        style={container} 
        disabled={disabled} 
        {...others}
    >
        <Text style={text}>
            {content}
        </Text>
    </TouchableOpacity>
  )
}

interface ButtonStyleProps {
    color?: "primary" | "secondary" | "ghost"
    disabled?: boolean | null
}
const styles = (theme:DefaultTheme, {color, disabled}:ButtonStyleProps) => {
    const {main, text, border} = color ? theme[color] : theme.primary;
    return StyleSheet.create({
        container: {
            backgroundColor: main,
            borderColor: border,
            opacity: disabled ? 0.6 : 1,
            borderWidth: .5,
            borderRadius: 5,
            padding: 10,
        },
        text:{
            fontSize: 20,
            color: text
        },

    })
}

export default Button;
