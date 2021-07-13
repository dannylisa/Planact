import { DefaultTheme } from '@/style/styled'
import React, { useEffect, useState } from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { AntDesign, Ionicons } from '@expo/vector-icons'
import dayjs, { Dayjs } from 'dayjs'
import useTheme from '@/modules/theme/hooks'
import { useDailyList } from '@/modules/userDailyList/hooks'
import { Text } from '@components/materials';

interface MonthChangeProps {}

function MonthChange({}: MonthChangeProps) {
  const theme = useTheme()
  const { container } = React.useMemo( () => styles(theme), [theme])
  const { selected, getSelectedDaily, initialDailyFetch } = useDailyList();
  const [day, setDay] = useState<Dayjs>(dayjs());
  useEffect(() => {
    setDay(dayjs(getSelectedDaily().date))
  }, [selected])
  return (
    <View style={container}>
      <Text 
        headings={1}
        flex={1}
        bold
        align="left"
        content={`${
          day.year()!== dayjs().year() ? 
            `${day.year()}년 `:''}${day.month() + 1}월`} />
      <TouchableOpacity onPress={initialDailyFetch}>
        <Ionicons name="refresh" size={24} />
      </TouchableOpacity>
    </View>
  )
}

const styles = (theme: DefaultTheme) =>
  StyleSheet.create({
    container: {
      minHeight: 40,
      paddingTop: 15,
      paddingHorizontal: 20,
      flexDirection: "row",
      justifyContent: "space-between"
    },
  })

export default MonthChange
