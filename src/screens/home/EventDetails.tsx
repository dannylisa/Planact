import { shadow } from "@/style/style-util";
import { DefaultTheme } from "@/style/styled";
import { IUserEvent } from "@/utils/data";
import React, { useMemo } from "react";
import { Text } from '@components/materials';
import { StyleSheet, View } from "react-native";
import { useState } from "react";
import useTheme from "@/modules/theme/hooks";
import { Check, Score } from "./proofs";


const EventDetails = (event:IUserEvent) => {
    const {event: {seq, title, proof_type}, proof} = event;
    const theme = useTheme();
    const {wrapper, textContainer, proofContainer} = useMemo(() => styles(theme), [theme]);

    return(
        <View style={wrapper}>
            <View style={textContainer}>
                <Text bold flex={1} headings={2} content={`${seq+1}.`}/>
                <Text align="left" headings={2} flex={3.5} content={title} />
            </View>
            <View style={proofContainer}>
                {/* <Check proof={proof===null ? null : Boolean(proof)} /> */}
                <Score title={title} proof={proof}/>
            </View>
        </View>
    )
}

const styles = (theme:DefaultTheme) => {
    const { content } = theme;
    return StyleSheet.create({
        wrapper:{
            flexDirection: "row",
            height: 55,
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
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
        }
    })
}
export default EventDetails;
