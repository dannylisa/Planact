import React from "react"
import { ISchedule } from "@/utils/data"
import { StyleSheet, View } from "react-native"
import { shadow } from "@/style/style-util"
import { DefaultTheme } from "@/style/styled"
import { useMemo } from "react"
import useTheme from "@/modules/theme/hooks"
import { Text, TextButton } from "@components/materials"
import { TouchableView } from "@/components/materials/TouchableView"

interface ScheduleListItemProps {
    schedule: ISchedule
    onPress: () => void
}
const ScheduleListItem = ({schedule, onPress}:ScheduleListItemProps) => {
    const theme = useTheme()
    const { wrapper, container, triangle, tag } = useMemo(() => styles(theme), [theme])
    const { id, name, description, price } = schedule;
    return(
        <View style={wrapper}>
            <TouchableView style={container} onPress={onPress}>
                <Text bold headings={2} paddingVertical={5} align="left" content={name}/>
                <Text  headings={4} align="left" content={description}/>
            </TouchableView>
            <View style={triangle} />
            <View style={tag}>
                <Text headings={4} content={"Free"} />
            </View>
        </View>
    )
}

const styles = ({content}:DefaultTheme) => StyleSheet.create({
    wrapper:{
        zIndex: 0,
        marginBottom: 14,
    },
    container:{
        height: 75,
        borderRadius:5,
        width: "98.5%",
        zIndex: 2,
        paddingVertical: 12,
        paddingLeft: 20,
        paddingRight: 50,
        backgroundColor: content,
        ...shadow
    },
    triangle:{
        position: "absolute",
        borderBottomColor: "#ffaaaacc",
        borderLeftColor: "#ffaaaacc",
        top: "2%",
        right: 0,
        borderBottomWidth:26,
        borderLeftWidth:17,
        borderTopRightRadius: 16,
        borderBottomLeftRadius: 22,
        borderBottomRightRadius: 22,
        zIndex: 1,
        ...shadow
    },
    tag:{
        position: "absolute",
        top: "10%",
        right: 0,
        backgroundColor: "#ffaaaa",
        paddingLeft: 12,
        paddingRight: 16,
        paddingVertical: 4,
        borderTopRightRadius: 2,
        borderRadius: 3,
        zIndex: 3,
        ...shadow
    }
})

export default ScheduleListItem