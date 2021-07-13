import React, { useMemo, useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { GroupedEvent } from '@/utils/data'
import { DefaultTheme } from '@/style/styled'
import { shadow } from "@modules/theme/hooks"
import { isLight } from '@modules/theme/hooks'
import EventDetails from './EventDetails'
import useTheme from '@/modules/theme/hooks'

function ToggleEventList(props: GroupedEvent) {
  const { schedule:{schedule:{name}, alias, color}, events } = props

  const theme = useTheme();
  const {
    toggleWrapper,
    toggleButton,
    circleContainer,
    circle,
    toggleText,
    accentText,
    text,
  } = useMemo(() => styles(theme, color), [theme])

  const [show, setShow] = useState<boolean>(true)
  const toggleShow = () => setShow((prev) => !prev)
  return (
    <View style={toggleWrapper}>
      <TouchableOpacity style={toggleButton} onPress={toggleShow}>
        <View style={circleContainer}>
          <View style={circle} />
        </View>
        <View style={toggleText}>
          <Text style={accentText}>{`${name} ${events[0].event.dateof}일차`}</Text>
        </View>
      </TouchableOpacity>
      {show && (
        <View>
          {events.map((event, idx) => (
            <EventDetails userevent_id={event.id} key={idx} />
          ))}
        </View>
      )}
    </View>
  )
}

const styles = (theme: DefaultTheme, color: string) => {
  const { content, text, border } = theme
  const shadowOption = isLight(theme) ? shadow : {}
  return StyleSheet.create({
    toggleWrapper: {
      marginBottom: 20,
      ...shadowOption,
    },
    toggleButton: {
      height: 60,
      flexDirection: 'row',
    },
    circleContainer: {
      width: 60,
      padding: 20,
      backgroundColor: content,
    },
    circle: {
      borderRadius: 50,
      flex: 1,
      backgroundColor: color,
    },
    toggleText: {
      flex: 5,
      backgroundColor: content,
      justifyContent: 'center',
    },
    accentText: {
      color: text,
      fontWeight: '800',
      fontSize: 16,
    },
    text: {
      fontWeight: '800',
      color: text,
    },
  })
}

export default ToggleEventList
