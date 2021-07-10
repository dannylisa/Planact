import { GlobalState } from '@/modules'
import { DefaultTheme } from '@/style/styled'
import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { AntDesign } from '@expo/vector-icons'
import dayjs from 'dayjs'
import useTheme from '@/modules/theme/hooks'

interface MonthChangeProps {}

function MonthChange({}: MonthChangeProps) {
  const theme = useTheme()
  const { container } = React.useMemo( () => styles(theme), [theme])
  const day = dayjs()
  return (
    <View style={container}>
      <TouchableOpacity>
          <AntDesign name="left" size={24} color="black" />
      </TouchableOpacity>
      <Text>{`${day.month() + 1} ${day.year()}`}</Text>
      <TouchableOpacity>
          <AntDesign name="right" size={24} color="black" />
      </TouchableOpacity>
    </View>
  )
}

const styles = (theme: DefaultTheme) =>
  StyleSheet.create({
    container: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginHorizontal: 10,
      marginTop: 20,
    },
  })

export default MonthChange
