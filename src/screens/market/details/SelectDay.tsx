import useTheme from "@/modules/theme/hooks";
import { DefaultTheme } from "@/style/styled";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Text } from "@components/materials";
import { TouchableView } from "@/components/TouchableView";
import { korday } from "@/utils/date";

interface SelectDayProps {
    selectedDays: Boolean[];
    setSelectedDays: Dispatch<SetStateAction<boolean[]>>;
}
export default function SelectDay({selectedDays, setSelectedDays}:SelectDayProps){
    const theme = useTheme()
    const {wrapper, container, day, selected} = React.useMemo(() => styles(theme), [theme])
    const days = Array(7).fill(0).map((_, i) => i);

    const toggleSelected = (idx:number) => () => setSelectedDays(prev => {
        prev.splice(idx, 1, !prev[idx])
        return [...prev];
    })

    return (
        <View style={wrapper}>
            {
                days.map((item) => (
                    <TouchableView 
                        onPress={toggleSelected(item)}
                        style={container} 
                        key={item}>
                        <Text
                            style={selectedDays[item]? [day, selected] : day} 
                            paddingVertical={7} 
                            content={korday[(item+1)%7]} 
                        />
                    </TouchableView>
                ))
            }
        </View>
    )
}

const styles = ({primary, secondary}:DefaultTheme) => StyleSheet.create({
    wrapper:{
        flex: 1,
        flexDirection: "row"
    },
    container:{
        flex: 1,
        padding: 5,
    },
    day:{
        overflow: "hidden",
        borderRadius: 12,
        backgroundColor: secondary.main,
        color: secondary.text
    },
    selected:{
        backgroundColor: primary.main,
        color: primary.text
    }
})