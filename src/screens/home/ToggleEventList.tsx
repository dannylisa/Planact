import React, { useMemo, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { GroupedEvent } from '@/utils/data'
import { DefaultTheme } from '@/style/styled'
import useTheme, { shadow, isLight } from '@modules/theme/hooks'
import EventDetails from './EventDetails'
import { CircleMenuItem } from '@/components/materials'

function ToggleEventList(props: GroupedEvent) {
  const { schedule:{schedule:{name}, alias, color}, events } = props

  const theme = useTheme();
  const {
    toggleWrapper,
  } = useMemo(() => styles(theme, color), [theme])

  const [show, setShow] = useState<boolean>(true)
  const toggleShow = () => setShow((prev) => !prev)
  return (
    <View style={toggleWrapper}>
      <CircleMenuItem 
          color={color}
          onPress={toggleShow} 
          content={`${name} ${events[0].event.dateof}일차`} 
      />
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
  const shadowOption = isLight(theme) ? shadow : {}
  return StyleSheet.create({
    toggleWrapper: {
      marginBottom: 20,
      ...shadowOption,
    },
  })
}

export default ToggleEventList
