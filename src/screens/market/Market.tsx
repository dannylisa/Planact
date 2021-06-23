import { GlobalState } from "@/modules";
import { DefaultTheme } from "@/style/styled";
import React from "react";
import { StyleSheet } from "react-native";
import { useSelector } from "react-redux";
interface MarketProps {

}
function Market({}:MarketProps){
    const theme = useSelector(({theme}:GlobalState) => theme)
    const {x, y} = styles(theme);
}

const styles = (theme:DefaultTheme) => {
    return StyleSheet.create({
        x:{},
        y:{}

    })
}

export default Market;

