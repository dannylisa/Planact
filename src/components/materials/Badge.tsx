import useTheme, { dangerColors } from "@/modules/theme/hooks";
import { DefaultTheme } from "@/style/styled";
import React, { useMemo } from "react";
import { StyleProp, StyleSheet, TouchableOpacity, View, ViewStyle } from "react-native";
import { ButtonColors } from "./Button";
import Text from "./Text";

export interface BadgeProps {
    color: ButtonColors
    content: string
    onBadgePress?: () => any
    style?: StyleProp<ViewStyle>
}
export default ({color, content, onBadgePress, style}:BadgeProps) => {
    const theme = useTheme();
    const {badge} = useMemo(() =>badgeStyles(theme), [theme]);
    const keyTheme = color === 'danger' ? dangerColors(theme) : theme[color] 
    return (
        onBadgePress ?
        <TouchableOpacity 
            style={[badge, {backgroundColor:keyTheme.main}, style]}
            onPress={onBadgePress}
        >
            <Text
                color={keyTheme.text}
                content={content}
            />
        </TouchableOpacity>
        :
        (
            <View style={[badge, {backgroundColor:keyTheme.main}, style]}>
                <Text
                    color={keyTheme.text}
                    content={content}
                />  
            </View>
        )
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