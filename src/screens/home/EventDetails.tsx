import { GlobalState } from "@/modules";
import { highlight, shadow } from "@/style/style-util";
import { DefaultTheme } from "@/style/styled";
import { IUserEvent, done } from "@/utils/data";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";
import { Ionicons } from '@expo/vector-icons';
import { useState } from "react";
import { useEffect } from "react";


const EventDetails = (event:IUserEvent) => {
    const {seq, content, completed} = event;
    const theme = useSelector(({theme}:GlobalState) => theme);
    const [done, setDone] = useState<done>(completed);
    const toggleDone = (value:done) => () => setDone(prev => prev!==value ? value : null  );
    const {wrapper, textContainer, seqText, text, iconContainer} = styles(theme);
    const [contentText, setContentText] = useState(text);
    useEffect(() => {
        const strike = {
            textDecorationLine:"line-through",
            textDecorationColor:"#f02323d2"
        };
        switch(done){
            case 0: setContentText({...text, ...strike}); break;
            case 1: setContentText({...text, ...highlight("green")}); break;
            case 2: setContentText({...text, ...highlight("blue")}); break;
            case null: 
            default:
                setContentText(text);
        }
    }, [done])

    return(
        <View style={wrapper}>
            <View style={textContainer}>
                <Text style={seqText}>
                    {seq}. &nbsp;
                </Text>
                <Text style={contentText}>
                    {content}
                </Text>
            </View>
            <View style={iconContainer}>
                <Ionicons 
                    name="checkmark-done-circle" 
                    onPress={toggleDone(2)}
                    size={30} 
                    color="#1663f1d3"
                    />
                <Ionicons 
                    onPress={toggleDone(1)}
                    name="checkmark-circle" 
                    size={30} 
                    color="#0ec277d3" 
                    />
                <Ionicons 
                    onPress={toggleDone(0)}
                    name="close-circle" 
                    size={30} 
                    color="#f02323d2" 
                    />
            </View>
        </View>
    )
}

const styles = (theme:DefaultTheme) => {
    const { content, text, border } = theme;
    return StyleSheet.create({
        wrapper:{
            flexDirection: "row",
            height: 45,
            backgroundColor: content,
        },
        textContainer:{
            justifyContent: "center",
            alignItems: "center",
            flex: 3,
            flexDirection: "row"
        },
        seqText:{
            fontWeight: "700",
            textAlign: "right",
            flex: 1,
            fontSize: 16,
            color: text
        },
        text:{
            fontWeight: "500",
            flex: 5,
            fontSize: 15,
            color: text
        },
        iconContainer:{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            flex: 1,
        }
    })
}

export default EventDetails;