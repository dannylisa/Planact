import React, { useMemo } from "react";
import useTheme, { dangerColors, isLight, shadow } from "@/modules/theme/hooks";
import { DefaultTheme } from "@/style/styled";
import { TouchableOpacity, TouchableOpacityProps, StyleSheet, View } from "react-native"
import Text from "./Text";
import Badge, { BadgeProps } from "./Badge";

interface MenuItemProps extends TouchableOpacityProps {
    content: string;
    color: string;
    badge?: BadgeProps
}
export default function (props:MenuItemProps){
    const {content, color, ...others} = props;
    const theme = useTheme()
    const {item, circleContainer, circle} = useMemo(() =>styles(theme, color), [theme]);
    return (
        <TouchableOpacity style={item} {...others}>
            <View style={circleContainer}>
                <View style={circle} />
            </View>
            <Text 
                bold
                headings={2}
                align="left"
                content={content} 
                flex={8} 
            />
            {props.badge ? <Badge {...props.badge} />: <></>}
        </TouchableOpacity>
    )
}

const styles = (theme:DefaultTheme, color: string) => {
    const {content} = theme;
    const shadowOption = isLight(theme) ? shadow : {}
    return StyleSheet.create({
        item:{
            padding: 18,
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: content,
            ...shadowOption,
        },
        circleContainer: {
            width: 60,
            paddingVertical: 6,
            backgroundColor: content,
            marginRight: 3,
            flex: 1,
        },
        circle: {
            borderRadius: 50,
            borderColor: "#ccc",
            padding: 10,
            marginLeft: 6,
            marginRight: 18,
            flex: 1,
            backgroundColor: color,
        }
    }
)}