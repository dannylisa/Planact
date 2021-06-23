import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { GroupedEvent } from "@/utils/data";
import { DefaultTheme } from "@/style/styled";
import { useSelector } from "react-redux";
import { GlobalState } from "@/modules";
import { shadow } from "@/style/style-util";
import { isLight } from "@/style/themes";

function ToggleEventList(props:GroupedEvent) {
    const {topic, color} = props;

    const theme = useSelector(({theme}:GlobalState) => theme);
    const {toggleContainer, circleContainer, circle, 
            toggleText, accentText, text} = styles(theme, color);

    return (
        <TouchableOpacity style={toggleContainer}>
            <View style={circleContainer}>
                <View style={circle}/>
            </View>
            <View style={toggleText}>
                <Text style={accentText}>
                    {topic}
                </Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = (theme:DefaultTheme, color:string) => {
    const { content, text, border } = theme;
    const shadowOption = isLight(theme) ? shadow : {};
    return StyleSheet.create({
        toggleContainer : {
            width: "100%",
            height: 60,
            borderBottomColor: border,
            borderBottomWidth: 0.5,
            marginBottom: 7,
            flexDirection: "row",
            ...shadowOption
        },
        circleContainer:{
            width: 60,
            padding: 20,
            backgroundColor: content
        },
        circle:{
            borderRadius: 50,
            flex: 1,
            backgroundColor: color,
        },
        toggleText:{
            flex: 5,
            backgroundColor: content,
            justifyContent: "center",
        },
        accentText:{
            color: text,
            fontWeight: "800",
            fontSize: 16
        },
        text:{
            fontWeight: "800",
            color: text
        }
    })
}

export default ToggleEventList