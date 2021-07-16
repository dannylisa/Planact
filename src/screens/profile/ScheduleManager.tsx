import React, { useMemo } from "react"
import { CircleMenuItem, Text } from "@/components/materials"
import { View, SafeAreaView, StyleSheet } from "react-native"
import { DefaultTheme } from "@/style/styled"
import useTheme from "@/modules/theme/hooks"
import { useUserSchedule } from "@/modules/userSchedule/hooks"

export default function () {
    const theme = useTheme()
    const { container, title } = useMemo(() => styles(theme), [theme]);
    const { schedules } = useUserSchedule();
    console.log(schedules)
    return (
        <SafeAreaView style={container}>
            <View>
                <View style={title}>
                    <Text content="내 플랜" bold align="left" headings={1}/>
                </View>
                {schedules.map((schedule, idx) => (
                    <CircleMenuItem 
                        content={schedule.alias} 
                        color={schedule.color}
                        key={idx}
                    />
                ))}
            </View>
        </SafeAreaView>
    )
}


const styles = (theme: DefaultTheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.mainBackground,
    },
    title:{
        paddingHorizontal: 15,
        paddingVertical: 20
    }
  })
