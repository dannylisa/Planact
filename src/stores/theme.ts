import { dark, light } from "@/style/themes";
import { DefaultTheme } from "@/style/styled";

type themeType = "light" | "dark";
interface changeThemeAction {
    type: themeType;
}

const changeTheme = (type:themeType = "light"):changeThemeAction => ({type});
export const actionCreators = {
    changeTheme
}

const theme = (state:DefaultTheme = light, action:changeThemeAction) => {
    switch(action.type){
        case "light": return light;
        case "dark": return dark;
        default: return state;
    }
}
export default theme;
