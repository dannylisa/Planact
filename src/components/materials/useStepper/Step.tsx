import { TouchableView } from "@/components/TouchableView";
import React, { useMemo } from "react";
import { View, Text, StyleSheet } from "react-native";

interface StepProps {
    active: boolean
    done: boolean
    item: string | number
    doneColor: string
    todoColor: string
    activeColor: string
    doneTextColor: string
    todoTextColor: string
    onPress: () => void
}
export default ({active, done, item, onPress, ...others}:StepProps) => { 
    const { container, text, step, activeStep, doneStep, todoStep, doneText, todoText } = useMemo(() => styles(others), [others])
    const theme = done ? active ? [doneStep, activeStep] : [doneStep] : [todoStep]
    return(
        <TouchableView style={container} onPress={onPress}>
            <View style={[step, ...theme]}>
                <Text style={done ? [text, doneText] : [text, todoText]}>{item}</Text>
            </View>
        </TouchableView>
    )
}

interface StepStyleProps {
    doneColor: string
    todoColor: string
    activeColor: string
    doneTextColor: string
    todoTextColor: string
}
const styles = ({doneColor, todoColor, activeColor, doneTextColor, todoTextColor}:StepStyleProps) => {
    const size = 45;
    return StyleSheet.create({
        container:{
            width: size,
            justifyContent: "center"
        },
        text:{
            textAlign: "center",
            fontWeight: "700",
            fontSize: 18
        },
        doneText: {
            color: doneTextColor,
        },
        todoText:{
            color: todoTextColor,
        },
        step:{
            width: size,
            height: size,
            borderRadius:30,
            justifyContent: "center"
        },
        activeStep: {
            backgroundColor: activeColor
        },
        doneStep: {
            backgroundColor: doneColor
        },
        todoStep: {
            backgroundColor: todoColor
        }
    })
}

