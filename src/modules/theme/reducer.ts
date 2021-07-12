import themes from "@/style/themes";
import { DefaultTheme, themeType } from "@/style/styled";

interface changeThemeAction {
    type: themeType;
}

const changeTheme = (type:themeType):changeThemeAction => ({type});
export const actionCreators = {
    changeTheme
}

// const theme = (state:DefaultTheme = dark_orange, action:changeThemeAction) => {
const theme = (state:DefaultTheme = themes[0], action:changeThemeAction) => {
    if(action.type)
        return themes.find(theme => theme.mode_name === action.type) || state
    else return state
}
export default theme;
