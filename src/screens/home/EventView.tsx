import React from 'react'
import { IUserEvent } from '@/utils/data'
import { TouchableOpacity, View, Text, StyleSheet, Alert } from 'react-native'
import { DefaultTheme } from '@/style/styled'
import { useSelector } from 'react-redux'
import { getScheduleById, GlobalState } from '@modules/index'

interface EventViewProps extends IUserEvent {
  selected: number
  index: number
}

function EventView(props: EventViewProps) {
  const { abb, title, schedule_id, index, selected } = props
  const theme = useSelector((state: GlobalState) => state.theme)
  const schedule = getScheduleById(schedule_id)
  const color = schedule?.color || '#333'
  const { container, iconContainer, icon, contentWrapper, content } = styles(
    theme,
    { color }
  )
  return (
    <TouchableOpacity
      style={[
        container,
        selected === index && { backgroundColor: theme.selected },
      ]}
    >
      <View style={iconContainer}>
        <View style={icon} />
      </View>
      <View style={contentWrapper}>
        <Text style={[content, selected === index && { color: '#fff' }]}>
          {abb}
        </Text>
      </View>
    </TouchableOpacity>
  )
}

interface EventViewStyleProps {
  color: string
}
const styles = (theme: DefaultTheme, { color }: EventViewStyleProps) => {
  const { content, text } = theme
  return StyleSheet.create({
    container: {
      backgroundColor: content,
      height: 20,
      flexDirection: 'row',
    },
    iconContainer: {
      flex: 1,
      paddingTop: 2.5,
      paddingBottom: 3.5,
      paddingLeft: 3,
      paddingRight: 5,
    },
    icon: {
      backgroundColor: color,
      flex: 1,
      borderRadius: 50,
    },
    contentWrapper: {
      flex: 6,
    },
    content: {
      color: text,
    },
  })
}

export default EventView
