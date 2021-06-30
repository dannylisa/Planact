import { GlobalState } from '@/modules'
import { DefaultTheme } from '@/style/styled'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { useSelector } from 'react-redux'
import { AntDesign } from '@expo/vector-icons'
import dayjs from 'dayjs'
import { TouchableView } from '@/components/TouchableView'

interface MonthChangeProps {}

function MonthChange({}: MonthChangeProps) {
  const { theme } = useSelector((state: GlobalState) => state)
  const { container } = styles(theme)
  const day = dayjs()
  return (
    <View style={container}>
      <TouchableView>
        <AntDesign name="left" size={24} color="black" />
      </TouchableView>

      <Text>{`${day.month()} ${day.year()}`}</Text>
      <TouchableView>
        <AntDesign name="right" size={24} color="black" />
      </TouchableView>
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
    },
  })

export default MonthChange
