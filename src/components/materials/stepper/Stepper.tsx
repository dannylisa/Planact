import React, { useState } from "react"
import { View, Text, StyleSheet, StyleProp, ViewStyle } from "react-native"
import Bar from "./Bar";
import Step from "./Step";

interface StepperProps extends UseStepperProps {
    active:number
}
function StepperView(props:StepperProps){
    const {size, style, active, accentOnlyActive} = props
    const {wrapper, activeStep, doneStep, todoStep} = styles;
    const items = Array(size).fill(0).map((_, i) => i+1)
    return(
        <View style={style}>
            {items
                .filter((_, i) => i<size-1)
                .map((item, idx) => (
                <>
                    <Step 
                        active={idx === active} 
                        done={ accentOnlyActive ? idx === active : idx <= active} 
                        item={item}
                    />
                    <Bar done={idx < active} />
                </>
            ))}
            <Step 
                active={(size-1) === active} 
                done={(size-1) === active} 
                item={items[size-1]}
            />
        </View>
    )
}



const styles = StyleSheet.create({
    wrapper: {

    },
    activeStep: {

    },
    doneStep: {

    },
    todoStep: {

    }
})


export interface UseStepperProps {
    size:number
    accentOnlyActive?: boolean
    style?: StyleProp<ViewStyle>
}

export default function useStepper(props:UseStepperProps){
    const {size, accentOnlyActive} = props
    if(size>5) throw Error("Size is to Big... Please send Less or Equal than 5.")

    const [active, setActive] = useState<number>(0);
    const prevStep = () => setActive(prev => prev>0 ? prev-1 : prev )
    const nextStep = () => setActive(prev => prev<size-1 ? prev+1 : prev )
    const Stepper = () => (
        <StepperView 
            {...props} 
            active={active}
            accentOnlyActive={accentOnlyActive}
        />
    )


    return {
        Stepper,
        active,
        setActive,
        nextStep,
        prevStep
    }
}