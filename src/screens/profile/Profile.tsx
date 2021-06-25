import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { DefaultTheme } from "@/style/styled";
import { useSelector } from "react-redux";
import { GlobalState } from "@/modules";
import { themes } from "@/style/themes";
import ThemeBlock from "./ThemeBlock";
import MenuItem from "@/components/MenuItem";
interface ProfileProps {

}

function Profile({}:ProfileProps){
    const theme = useSelector(({theme}:GlobalState) => theme);
    const { wrapper, toggleContainer, blockContainer } = styles(theme);
    const [showThemes, setShowThemes] = useState<boolean>(true);
    const toggleThemes = () => setShowThemes(prev => !prev);
    return (
        <View style={wrapper}>
            <MenuItem content={"로그인"} />
            <View style={toggleContainer}>
                <MenuItem
                    onPress={toggleThemes}
                    content="테마 선택"
                    />
                {showThemes &&
                    <View style={blockContainer}>
                        {
                            themes.map((theme, idx) => (
                                <ThemeBlock theme={theme} key={idx} />
                            ))
                        }
                    </View>
                }
            </View>
        </View>
    )
}


const styles = (theme:DefaultTheme) => {
    const {mainBackground, border, text, content} = theme;
    return StyleSheet.create({
        wrapper:{
            backgroundColor: mainBackground,
            flex: 1
        },
        toggleContainer:{
            backgroundColor: content,

        },
        blockContainer:{
            flexDirection: 'row',
            padding: 15
        },
    })
}

export default Profile