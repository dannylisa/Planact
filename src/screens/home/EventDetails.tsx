import { GlobalState } from "@/modules";
import { shadow } from "@/style/style-util";
import { DefaultTheme } from "@/style/styled";
import { isLight } from "@/style/themes";
import { IUserEvent } from "@/utils/data";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useSelector } from "react-redux";
import { Ionicons } from '@expo/vector-icons';

const EventDetails = (event:IUserEvent) => {
    const {content, completed} = event;
    const theme = useSelector(({theme}:GlobalState) => theme);
    const {wrapper, container, text} = styles(theme);
    return(
        <View style={wrapper}>
            <View style={container}>
                <Text style={text}>
                    {content}
                </Text>
            </View>
            <Ionicons name="ios-person" size={30} color="#e84c31" />
            <Ionicons name="ios-person" size={30} color="#fffc5f" />
            <Ionicons name="ios-person" size={30} color="#19e690" />
        </View>
    )
}

const styles = (theme:DefaultTheme) => {
    const { content, text, border } = theme;
    const shadowOption = isLight(theme) ? shadow : {};
    return StyleSheet.create({
        wrapper:{
            flexDirection: "row",
            height: 45,
            backgroundColor: content
        },
        container:{
            justifyContent: "center",
            alignItems: "center",
            flex: 2
        },
        text:{
            fontWeight: "500"
        }
    })
}

export default EventDetails;