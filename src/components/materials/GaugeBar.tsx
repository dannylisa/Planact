import useTheme from "@/modules/theme/hooks";
import { DefaultTheme } from "@/style/styled";
import React, { useMemo } from "react";
import { StyleSheet, View } from "react-native";
import Text from "./Text"

interface GaugeBarProps {
    denom: number
    num: number
}
export default function({denom, num}:GaugeBarProps){
    const theme = useTheme()
    const {wrapper, left, right} = useMemo(()=> styles(theme), [theme]);
    let leftFlex = Math.floor(1000*num/denom)/100
    leftFlex = leftFlex > 1.2 ? leftFlex : 1.2
    return(
        <View style={wrapper}>
            <View style={[left, {flex:leftFlex}]} > 
                <Text 
                    content={Math.floor(1000*num/denom)/10+"%"}
                    color={theme.primary.text}
                />
            </View>
            <View style={[right, {flex:10-leftFlex}]} />
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