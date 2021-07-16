import React, { Fragment } from "react"
import { View, StyleSheet } from "react-native"
import { UseStepperProps } from "./index";
import Bar from "./Bar";
import Step from "./Step";

interface StepperProps extends UseStepperProps {
    active:number
    onStepPress: (idx:number) => any
}
export default function StepperView(props:StepperProps){
    let {
        size, 
        style, 
        active, 
        accentOnlyActive,
        activeStepColor,
        doneStepColor,
        todoStepColor,
        doneBarColor,
        todoBarColor,
        doneTextColor,
        todoTextColor,
        onStepPress
    } = props

    const activeSC = activeStepColor || doneStepColor || "#ff6565"; 
    const doneSC = doneStepColor || activeStepColor || "#ffdcdc"; 
    const todoSC = todoStepColor || "#cccccc"; 
    const doneBC = doneBarColor || activeStepColor || doneStepColor || "#ffdcdc"; 
    const todoBC = todoBarColor || "#cccccc"; 
    const doneTC = doneTextColor || "#fff"
    const todoTC = todoTextColor || "#fff"

    const {wrapper} = styles;
    const items = Array(size).fill(0).map((_, i) => i+1)
    return(
        <View style={[wrapper, style]}>
            {items
                .filter((_, i) => i<size-1)
                .map((item, idx) => (
                <Fragment key={idx}>
                    <Step
                        onPress={() => onStepPress(idx)}
                        key={2*idx}
                        active={idx === active} 
                        done={ accentOnlyActive ? idx === active : idx <= active} 
                        item={item}
                        doneColor={doneSC}
                        activeColor={activeSC}
                        todoColor={todoSC}
                        doneTextColor={doneTC}
                        todoTextColor={todoTC}
                    />
                    <Bar 
                        key={2*idx+1} 
                        done={accentOnlyActive ? false : idx < active} 
                        doneColor={doneBC}
                        todoColor={todoBC} />
                </Fragment>
            ))}
            <Step 
                onPress={() => onStepPress(size-1)}
                active={(size-1) === active} 
                done={(size-1) === active} 
                item={items[size-1]}
                doneColor={doneSC}
                activeColor={activeSC}
                todoColor={todoSC}
                doneTextColor={doneTC}
                todoTextColor={todoTC}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        flexDirection: "row",
        paddingHorizontal: 20,
    }
})