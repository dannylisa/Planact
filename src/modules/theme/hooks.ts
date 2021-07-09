import { useSelector } from "react-redux";
import { GlobalState } from "..";

export default function useTheme(){
    const theme = useSelector(({theme}: GlobalState) => theme);
    return theme;
};