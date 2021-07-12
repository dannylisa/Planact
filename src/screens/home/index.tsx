import React, { useEffect } from 'react'
import DailyList from './DailyList'
import DailyView from './DailyView'
import { DefaultTheme } from '@/style/styled'
import { SafeAreaView, View, StyleSheet } from 'react-native'
import MonthChange from './MonthChange'
import { useUserSchedule } from '@/modules/userSchedule/hooks'
import useTheme from '@/modules/theme/hooks'
import useDailyList from '@/modules/userDailyList/hooks'
import { useMemo } from 'react'
import { useUserState } from '@/modules/auth/hooks'

// 1회당 가져올 날짜 수
const UNIT_FETCH_ONCE = 7
// 최대 가져올 날짜 수
const FETCH_LIMIT = 35

export interface HomeProps {}

function Home({}: HomeProps) {
  const theme = useTheme()
  const { container } = useMemo(() => styles(theme), [theme])
  const { profile, forceLogOut } = useUserState()
  const { fetchUserSchedule } = useUserSchedule()
  const { initialDailyFetch } = useDailyList()

  useEffect(() => {
    if (!profile) return
    fetchUserSchedule()
    initialDailyFetch()
  }, [profile])

  return (
    <SafeAreaView style={container}>
      <MonthChange />
      <View style={{ minHeight: 140 }}>
        <DailyList />
      </View>
      <View style={{ flex: 1 }}>
        <DailyView />
      </View>
    </SafeAreaView>
  )
}

const styles = (theme: DefaultTheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'stretch',
      backgroundColor: theme.mainBackground,
    },
  })

export default Home
