import { DefaultTheme } from "@/style/styled";
import { useSelector } from "react-redux";
import { GlobalState } from "../index";

export default function useTheme(){
    const theme = useSelector(({theme}: GlobalState) => theme);
    return theme;
};

export const isLight = (theme:DefaultTheme):Boolean => { 
    return Boolean(theme.mode_name.match('light'))
}

export const SpecificColors = {
    red: '#f02323d2',
    blue: '#1663f1',
    yellow: "#ffcd3c"
}

export const shadow = {
    shadowColor: "#295573",
    shadowOpacity: 0.12,
    shadowRadius: 2.4,
    shadowOffset:{
        width: 0,
        height: 1.2
    },
    elevation: 1,
}

export const dangerColors = (theme:DefaultTheme) => isLight(theme) ? {
    main: theme.mainBackground,
    text: SpecificColors.red,
    border: SpecificColors.red
} : {
    main: SpecificColors.red,
    text: theme.primary.text,
    border: "#ffffff00"
}