import React, { useMemo } from "react";
import { View, StyleSheet } from "react-native";

interface BarProps {
    done: boolean
    doneColor: string
    todoColor: string
}

export default ({done, ...others}:BarProps) => { 
    const {wrapper, bar, doneBar, todoBar} = useMemo(() => styles(others), []);
    return(
        <View style={wrapper}>
            <View style={done ? [bar, doneBar] : [bar, todoBar]} />
        </View>
    )
}

const styles = ({doneColor, todoColor}:Omit<BarProps, "done">) => StyleSheet.create({
    wrapper:{
        flex: 1,
        justifyContent: "center"
    },
    bar:{
        borderWidth: 0.6,
        height:0,
    },
    doneBar: {
        borderColor: doneColor
    },
    todoBar: {
        borderColor: todoColor
    }
})