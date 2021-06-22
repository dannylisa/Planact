import { dark, light } from "@/style/themes";
import { DefaultTheme } from "@/style/styled";

type themeType = "theme/light" | "theme/dark";
interface changeThemeAction {
    type: themeType;
}

const changeTheme = (type:themeType = "theme/light"):changeThemeAction => ({type});
export const actionCreators = {
    changeTheme
}

const theme = (state:DefaultTheme = light, action:changeThemeAction) => {
    switch(action.type){
        case "theme/light": return light;
        case "theme/dark": return dark;
        default: return state;
    }
}
export default theme;
