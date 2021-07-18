import { GlobalState } from '@/modules';
import { DefaultTheme, themeType } from '@/style/styled';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

interface ThemeBlockProps {
    theme: DefaultTheme
}
export default function ThemeBlock({theme:{mode_name, content, text, primary:{main}}}:ThemeBlockProps){
    const theme = useSelector(({theme}:GlobalState) => theme);
    const {background, point} = styles(theme.mode_name === mode_name, content, text, main);
    const dispatch = useDispatch();
    const changeTheme = () => dispatch({type:mode_name});
    return(
        <TouchableOpacity style={background} onPress={changeTheme}>
            <View style={point}/>
        </TouchableOpacity>
    )
}   
const styles = (isCurrentTheme:boolean, content:string, text:string, main:string) => StyleSheet.create({
    background:{
        borderColor: (isCurrentTheme ? main : text),
        borderWidth: (isCurrentTheme ? 3 : 2),
        backgroundColor: content,
        borderRadius: 10,
        flex: 1,
        aspectRatio:1,
        padding: 8,
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
        marginHorizontal: 3
    },
    point:{
        borderRadius: 11,
        backgroundColor: main,
        width: 22,
        height: 22,
    }
})