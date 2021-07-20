import useTheme, { isLight } from "@/modules/theme/hooks";
import React, { useMemo } from "react";
import { View, StyleSheet } from "react-native";
import { DefaultTheme } from "@/style/styled";
import LightModeSvg from 'assets/icons/light_mode.svg'
import DarkModeSvg from 'assets/icons/dark_mode.svg'

const styles = (theme:DefaultTheme) => {
    return StyleSheet.create({
        wrapper:{
            flex: 1,
            alignItems: "center",
            justifyContent:'center',
            backgroundColor: theme.mainBackground
        },
        img:{
            width: 300,
            height: 300
        }
    })
}
export default function(){
    const theme = useTheme()
    const {wrapper} = useMemo(() => styles(theme), [theme])
    const isL = isLight(theme)
    const Logo = isL ? LightModeSvg : DarkModeSvg;
    
    return(
        <View style={wrapper}>
            <Logo 
                width={135}
                height={120}
                fillOpacity={isL ? 0.83 : 1}
            />
        </View>
    )
}

