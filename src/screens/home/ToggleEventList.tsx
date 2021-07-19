import React, { useMemo, useState } from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { GroupedEvent } from '@/utils/data'
import { DefaultTheme } from '@/style/styled'
import useTheme, { shadow, isLight } from '@modules/theme/hooks'
import { CircleMenuItem } from '@/components/materials'
import EventItem from './EventItem'
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'

function ToggleEventList(props: GroupedEvent) {
  const { schedule:{id, schedule:{name, fixed}, alias, color}, events } = props
  const navigation = useNavigation();

  const theme = useTheme();
  const {
    toggleWrapper, analytics
  } = useMemo(() => styles(theme, color), [theme])

  const [show, setShow] = useState<boolean>(true)
  const toggleShow = () => setShow((prev) => !prev)

  const onPress = () => navigation.navigate("Home/ScheduleManager/Analysis", {user_schedule:props.schedule})

  return (
    <View style={toggleWrapper}>
      <CircleMenuItem 
          color={color}
          onPress={toggleShow} 
          content={
            ['datetime', 'date'].includes(fixed) ?
            `${name}`
            :`${name} ${events[0].event.dateof}일차`
          }
      />
      <TouchableOpacity
        onPress={onPress} 
        style={analytics}
        >
        <Ionicons 
          name="analytics" 
          size={30} 
          color={theme.primary.main}
        />
      </TouchableOpacity>
      {show && (
        <View>
          {events.map((event, idx) => (
            <EventItem
              userschedule_id={id}
              userevent_id={event.id} 
              key={idx} 
            />
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
      marginBottom: 15,
      ...shadowOption,
    },
    analytics:{
      position: "absolute",
      right: 15,
      top:8.5
    }
  })
}

export default ToggleEventList
