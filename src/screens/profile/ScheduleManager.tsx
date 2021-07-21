import React, { useMemo } from "react"
import { CircleMenuItem, Text } from "@/components/materials"
import { View, SafeAreaView, StyleSheet } from "react-native"
import { DefaultTheme } from "@/style/styled"
import useTheme from "@/modules/theme/hooks"
import { useUserSchedule } from "@/modules/userSchedule/hooks"
import { useNavigation } from "@react-navigation/native"
import dayjs from "dayjs"

export default function () {
    const theme = useTheme()
    const { container, title } = useMemo(() => styles(theme), [theme]);
    const { schedules } = useUserSchedule();

    const navigation = useNavigation();

    return (
        <SafeAreaView style={container}>
            <View style={title}>
                <Text content="내 플랜" bold align="left" headings={1}/>
            </View>
            {/* 진행중인 플랜부터 정렬 */}
            {schedules.concat([])
                .sort((a, b) => dayjs(b.end_date).diff(a.end_date))
                .map((user_schedule, idx) => {
                const outdated = user_schedule.end_date < dayjs().format('YYYY-MM-DD')
                return (
                    <CircleMenuItem 
                        content={user_schedule.alias} 
                        color={user_schedule.color}
                        key={idx}
                        onPress={()=>
                            navigation.navigate("Profile/ScheduleManager/Analysis", {
                                user_schedule
                            })
                        }
                        badge={{
                            color: outdated ? "secondary": "primary",
                            content: outdated ? "완료": "진행 중",
                        }}
                    />
                )}
            )}
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
        padding: 20,
    },
  })
