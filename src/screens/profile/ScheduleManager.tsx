import React, { useMemo } from "react"
import { CircleMenuItem, Text } from "@/components/materials"
import { View, SafeAreaView, StyleSheet } from "react-native"
import { DefaultTheme } from "@/style/styled"
import useTheme from "@/modules/theme/hooks"
import { useUserSchedule } from "@/modules/userSchedule/hooks"
import { useNavigation } from "@react-navigation/native"

export default function () {
    const theme = useTheme()
    const { container, title } = useMemo(() => styles(theme), [theme]);
    const { schedules } = useUserSchedule();

    const navigation = useNavigation();
    return (
        <SafeAreaView style={container}>
            <View>
                <View style={title}>
                    <Text content="내 플랜" bold align="left" headings={1}/>
                </View>
                {schedules.map((user_schedule, idx) => (
                    <CircleMenuItem 
                        content={user_schedule.alias} 
                        color={user_schedule.color}
                        key={idx}
                        onPress={()=>
                            navigation.navigate("Profile/ScheduleManager/Analysis", {
                                user_schedule
                            })
                        }
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
        padding: 16,
    }
  })
