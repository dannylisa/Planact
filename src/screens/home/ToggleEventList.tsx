import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { GroupedEvent, IUserEvent } from '@/utils/data'
import { DefaultTheme } from '@/style/styled'
import { useSelector } from 'react-redux'
import { GlobalState } from '@/modules'
import { shadow } from '@/style/style-util'
import { isLight } from '@/style/themes'
import { useState } from 'react'
import EventDetails from './EventDetails'

function ToggleEventList(props: GroupedEvent) {
  const { topic, color, events } = props

  const theme = useSelector(({ theme }: GlobalState) => theme)
  const {
    toggleWrapper,
    toggleButton,
    circleContainer,
    circle,
    toggleText,
    accentText,
    text,
  } = styles(theme, color)
  const [show, setShow] = useState<boolean>(true)
  const toggleShow = () => setShow((prev) => !prev)
  return (
    <View style={toggleWrapper}>
      <TouchableOpacity style={toggleButton} onPress={toggleShow}>
        <View style={circleContainer}>
          <View style={circle} />
        </View>
        <View style={toggleText}>
          <Text style={accentText}>{`${topic} ${events[0].dateof}일차`}</Text>
        </View>
      </TouchableOpacity>
      {show && (
        <View>
          {events.map((event, idx) => (
            <EventDetails {...event} key={idx} />
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
