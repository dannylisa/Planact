import { GlobalState } from '@/../App';
import { DefaultTheme } from '@/style/styled';
import { IDaily } from '@/utils/data';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';

function DailyView({date, events}:IDaily){
    const theme = useSelector(({theme}:GlobalState) => theme);
    const {container} = styles(theme);
    return(
        <View style={container}>
            <Text>
                {date.format("YYYYMMDD")}
            </Text>
        </View>
    )
}

const styles = (theme:DefaultTheme) => {
    const { mainBackground, content } = theme;
    return(
        StyleSheet.create({
            container:{
                flex: 1,
                backgroundColor: mainBackground,
                padding: 5
            }
        })
    )
}

export default DailyView;