import useTheme from "@/modules/theme/hooks";
import React from "react";
import useStepper, {UseStepperProps} from "../useStepper";

const useThemedStepper = (props:UseStepperProps) => {
    const {size, activeStepColor, doneStepColor, todoStepColor, accentOnlyActive, doneBarColor, todoBarColor} = props;
    const theme = useTheme()
    const usage = useStepper({
        size,
        activeStepColor: activeStepColor || theme.primary.main,
        doneStepColor: doneStepColor || theme.primary.main,
        todoStepColor: todoStepColor || theme.secondary.main,
        doneBarColor: doneBarColor || theme.primary.main,
        todoBarColor: todoBarColor || theme.secondary.main,
        accentOnlyActive: accentOnlyActive===false ? false : true,
        doneTextColor: theme.primary.text,
        todoTextColor: theme.secondary.text
    })
    return usage;
}

export default useThemedStepper