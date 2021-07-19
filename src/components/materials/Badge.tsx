import useTheme, { dangerColors } from "@/modules/theme/hooks";
import { DefaultTheme } from "@/style/styled";
import React, { useMemo } from "react";
import { StyleSheet, View } from "react-native";
import { ButtonColors } from "./Button";
import Text from "./Text";

export interface BadgeProps {
    color: ButtonColors
    content: string
}
export default ({color, content}:BadgeProps) => {
    const theme = useTheme();
    const {badge} = useMemo(() =>badgeStyles(theme), [theme]);
    const keyTheme = color === 'danger' ? dangerColors(theme) : theme[color] 
    return (
        <View style={[badge, {backgroundColor:keyTheme.main}]}>
            <Text
                color={keyTheme.text}
                content={content}
            />
        </View>
    )
}

const badgeStyles = (theme:DefaultTheme) => {
    return StyleSheet.create({
        badge:{
            paddingHorizontal:12,
            paddingVertical: 6,
            borderRadius: 15
        },
    }
)}