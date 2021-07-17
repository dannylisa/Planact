import { IDaily, daytype } from '@/utils/data'
import { getDayType } from '@/utils/date'
import React, { useMemo } from 'react'
import { StyleSheet, TouchableOpacity, Text } from 'react-native'
import { DefaultTheme } from '@/style/styled'
import { isLight, shadow, SpecificColors } from "@modules/theme/hooks"
import useTheme from '@/modules/theme/hooks'
import { useDailyList } from '@/modules/userDailyList/hooks'
import ScheduleView from './ScheduleView'

interface DailyProps {
  index: number
  onPress: () => void
  daily: IDaily
}
function Daily({index, daily:{date, events}, onPress}: DailyProps) {
  // Theme, Style
  const theme = useTheme();
  const daytype: daytype = getDayType(date)
  const { container, selectedBorder, datetext, extra } = useMemo(() => styles(theme, daytype),[theme]);
  const uniqueUserScheduleIds = useMemo(() => {
      const ids = events.map(event => event.event.schedule)
      const uniqueIds = Array.from(new Set(ids));
      return uniqueIds;
  },[events])
  // Selected State
  const { selected } = useDailyList();
  return (
    <TouchableOpacity
        style={
            selected===index ? 
             [container, selectedBorder] 
            : container}
        onPress={onPress}
      >
      <Text style={datetext}>
        {date.date() > 1 ? date.date() : `${date.month() + 1}.${date.date()}`}
      </Text>
      {uniqueUserScheduleIds
        .filter((_, i) => i < 3)
        .map((id, idx) => (
          <ScheduleView key={idx} id={id} />
        ))}
      {uniqueUserScheduleIds.length > 3 && (
        <Text style={[extra, selected === index && { color: '#fff' }]}>
          +{uniqueUserScheduleIds.length - 3}
        </Text>
      )}
    </TouchableOpacity>
  )
}

const styles = (theme: DefaultTheme, daytype:daytype) => {
  const { content, text, primary } = theme
  const shadowOption = isLight(theme) ? shadow : {};
  const {red, blue} = SpecificColors;

  return StyleSheet.create({
    container: {
      backgroundColor: content,
      width: 120,
      height: 120,
      padding: 5,
      paddingTop: 3,
      borderRadius: 10,
      marginRight: 16,
      ...shadowOption,
    },
    selectedBorder:{
      borderColor: primary.main,
      borderWidth: 3
    },
    datetext: {
      color: daytype === 0 ? text : daytype === 1 ? blue : red,
      fontWeight: '800',
      fontSize: 20,
    },
    extra: {
      textAlign: 'center',
      color: text,
    },
  })
}

export default Daily
