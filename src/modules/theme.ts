import { dark_orange, light_orange } from "@/style/themes";
import { DefaultTheme } from "@/style/styled";

type themeType = "theme/light/orange" | "theme/dark/orange";
interface changeThemeAction {
    type: themeType;
}

const changeTheme = (type:themeType):changeThemeAction => ({type});
export const actionCreators = {
    changeTheme
}

// const theme = (state:DefaultTheme = dark_orange, action:changeThemeAction) => {
const theme = (state:DefaultTheme = light_orange, action:changeThemeAction) => {
    switch(action.type){
        case "theme/light/orange": return light_orange;
        case "theme/dark/orange": return dark_orange;
        default: return state;
    }
}
export default theme;
