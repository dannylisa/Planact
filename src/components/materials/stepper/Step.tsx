import React from "react";
import { View, StyleSheet } from "react-native";


interface StepProps {
    active: boolean
    done: boolean
    item: string | number
}
export default ({active, done, item}:StepProps) => { 
    const {step} = styles;
    return(
        <View style={step}>

        </View>
    )
}
const styles = StyleSheet.create({
    step:{
        width: 30,
        height: 30,
        borderRadius:30,
        backgroundColor: "#ffeeee"
    },
    activeStep: {

    },
    doneStep: {

    },
    todoStep: {

    }
})