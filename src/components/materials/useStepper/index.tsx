import React, { useState } from "react";
import { StyleProp, ViewStyle } from "react-native";
import StepperView from './Stepper'


export interface UseStepperProps {
    size:number
    accentOnlyActive?: boolean
    style?: StyleProp<ViewStyle>
    activeStepColor?: string
    doneStepColor?: string
    todoStepColor?: string
    doneBarColor?: string
    todoBarColor?: string
    doneTextColor?: string
    todoTextColor?: string
    onStepPress?: (idx:number) => any | React.Dispatch<React.SetStateAction<number>>
}

export default function useStepper(props:UseStepperProps){
    const {size, onStepPress, ...others} = props;
    if(size>5) throw Error("Size is to Big... Please send Less or Equal than 5.");

    const [active, setActive] = useState<number>(0);
    const prevStep = () => setActive(prev => prev>0 ? prev-1 : prev )
    const nextStep = () => setActive(prev => prev<size-1 ? prev+1 : prev )
    const StepperGetter = () => (
        <StepperView
            size={size}
            active={active}
            onStepPress={onStepPress || setActive}
            {...others} 
        />
    )

    return {
        StepperGetter,
        active,
        setActive,
        nextStep,
        prevStep
    }
}