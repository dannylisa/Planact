import React, { useEffect, useMemo, useState } from 'react'
import { View, Text, StyleSheet, Alert } from 'react-native'
import { DefaultTheme } from '@/style/styled'
import useTheme from '@/modules/theme/hooks'
import { useUserSchedule } from '@/modules/userSchedule/hooks'

interface ScheduleViewProps {
  id: string
}

function ScheduleView({id}: ScheduleViewProps) {
  const theme = useTheme()
  const { loading, getScheduleById } = useUserSchedule();
  const [alias, setAlias] = useState('')
  const [color, setColor] = useState('#999999')
  useEffect(() => {
    const schedule = getScheduleById(id);
    if(schedule){
      setAlias(schedule.alias);
      setColor(schedule.color);
    }
  },[])
  const { 
    icon, 
    container, 
    iconContainer, 
    contentWrapper, 
    content 
  } = useMemo(()=>styles(theme, color),[theme, color])
  return (
    <View
      style={[container]}
    >
      <View style={iconContainer}>
        <View style={icon} />
      </View>
      <View style={contentWrapper}>
        <Text style={content}>
          {alias}
        </Text>
      </View>
    </View>
  )
}

const styles = (theme: DefaultTheme, color: string) => {
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

export default ScheduleView
