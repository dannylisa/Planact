import { GlobalState } from '@modules/index'
import { DefaultTheme } from '@/style/styled'
import { GroupedEvent, IDaily, ISchedule, IUserEvent } from '@/utils/data'
import { korday } from '@/utils/date'
import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { useSelector } from 'react-redux'
import ToggleEventList from './ToggleEventList'

const groupBySchedule = (
  schedules: ISchedule[],
  events: IUserEvent[]
): GroupedEvent[] => {
  if (!events.length) return []

  const res: { [key: string]: GroupedEvent } = {}
  schedules.forEach(
    (schedule) =>
      (res[schedule.schedule_id] = {
        ...schedule,
        events: [],
      })
  )
  events.forEach((event) => {
    res[event.schedule_id].events.push(event)
  })
  return Object.values(res).filter(({ events }) => events.length > 0)
}
function DailyView({ date, events }: IDaily) {
  const { theme, userSchedules } = useSelector((state: GlobalState) => state)
  const { container, title } = styles(theme)
  const [groupedEvents, setGroupedEvents] = useState<GroupedEvent[]>([])
  useEffect(() => {
    const aggregated = groupBySchedule(userSchedules, events)
    setGroupedEvents(aggregated)
  }, [date])
  return (
    <View style={container}>
      <Text style={title}>
        {date.format(`M월 DD일 ${korday[date.day()]}요일`)}
      </Text>
      {groupedEvents.map((schedule, idx) => (
        <ToggleEventList {...schedule} key={idx} />
      ))}
    </View>
  )
}

const styles = (theme: DefaultTheme) => {
  const { mainBackground, text } = theme
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: mainBackground,
      padding: 5,
      paddingHorizontal: 15,
      //   paddingTop: 30,
    },
    title: {
      textAlign: 'center',
      fontWeight: '800',
      fontSize: 18,
      color: text,
      marginBottom: 10,
    },
  })
}

export default DailyView
