import useTheme from "@/modules/theme/hooks";
import { DefaultTheme } from "@/style/styled";
import React, { useMemo } from "react";
import { StyleSheet, View } from "react-native";
import {Text} from "."

interface GaugeBarProps {
    denom: number
    num: number
}
export default function({denom, num}:GaugeBarProps){
    const theme = useTheme()
    const {wrapper, left, right} = useMemo(()=> styles(theme), [theme]);
    return(
        <View style={wrapper}>
            <View style={[left, {flex:num}]} > 
                <Text 
                    content={Math.floor(10000*num/denom)/100+"%"}
                    color={theme.primary.text}
                />
            </View>
            <View style={[right, {flex:denom-num}]} />
        </View>
    )
}

const radius = 10 as const;
const styles = (theme:DefaultTheme) => StyleSheet.create({
    wrapper:{
        flexDirection: "row",
        width:"100%",
        height:25,
    },
    left:{
        backgroundColor: theme.primary.main,
        borderTopLeftRadius:radius,
        borderBottomLeftRadius:radius,
        alignItems:"center",
        justifyContent:"center"
    },
    right:{
        backgroundColor: theme.secondary.main,
        borderTopRightRadius:radius,
        borderBottomRightRadius:radius
    }
})