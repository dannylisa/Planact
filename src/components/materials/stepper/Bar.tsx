import React from "react";
import { View, StyleSheet } from "react-native";

interface BarProps {
    done: boolean
}

export default ({done}:BarProps) => ( 
    <View>

    </View>
)

const styles = StyleSheet.create({
    Bar:{
        flex: 1,
    },
    doneBar: {

    },
    todoBar: {

    }
})