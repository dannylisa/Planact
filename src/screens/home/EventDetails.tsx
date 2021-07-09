import { shadow } from "@/style/style-util";
import { DefaultTheme } from "@/style/styled";
import { IUserEvent } from "@/utils/data";
import React, { useMemo } from "react";
import { Text } from '@components/materials';
import { StyleSheet, View } from "react-native";
import { useState } from "react";
import useTheme from "@/modules/theme/hooks";


const EventDetails = (event:IUserEvent) => {
    const {event: {seq, title}} = event;
    const theme = useTheme();
    const {wrapper, textContainer, proofContainer} = useMemo(() => styles(theme), [theme]);

    return(
        <View style={wrapper}>
            <View style={textContainer}>
                <Text bold content={`${seq+1}.`}/>
                <Text align="left" flex={5} content={title} />
            </View>
            <View style={proofContainer}>

            </View>
        </View>
    )
}

const styles = (theme:DefaultTheme) => {
    const { content } = theme;
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
        proofContainer: {
            flex: 1,
        }
    })
}
export default EventDetails;
