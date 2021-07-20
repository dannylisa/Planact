import React, { useEffect, useState } from 'react'
import DailyList from './DailyList'
import DailyView from './DailyView'
import { DefaultTheme } from '@/style/styled'
import { SafeAreaView, View, StyleSheet, StatusBar } from 'react-native'
import MonthChange from './MonthChange'
import { useUserSchedule } from '@/modules/userSchedule/hooks'
import useTheme, { isLight } from '@/modules/theme/hooks'
import { useDailyList } from '@/modules/userDailyList/hooks'
import { useMemo } from 'react'
import { useUserState } from '@/modules/auth/hooks'
import media from '@/style/media'
import Splash from '../Loading/Splash'
import { useNavigation } from '@react-navigation/native'

// 1회당 가져올 날짜 수
const UNIT_FETCH_ONCE = 7
// 최대 가져올 날짜 수
const FETCH_LIMIT = 35

export interface HomeProps {}

function Home({}: HomeProps) {
  const theme = useTheme()
  const { container } = useMemo(() => styles(theme), [theme])
  const { profile } = useUserState()
  const { fetchUserSchedule } = useUserSchedule()
  const { initialDailyFetch } = useDailyList()
  
  const [loading, setLoading] = useState(true)
  const navigation = useNavigation()

  useEffect(() => {
    setTimeout(() => setLoading(false),1500);
  }, [])
  useEffect(() => {
    navigation.dangerouslyGetParent()?.setOptions({tabBarVisible: !loading})
  }, [loading])

  useEffect(() => {
    if (!profile) return
    fetchUserSchedule(); 
    initialDailyFetch();
  }, [profile])

  return loading ? (
    <Splash />
  ): (
    <SafeAreaView style={container}>
      <StatusBar barStyle={isLight(theme) ? "dark-content" : "light-content"} />
      <MonthChange />
      <View style={{ minHeight: 140 }}>
        <DailyList />
      </View>
      <View style={{flex:1}}>
        <DailyView />
      </View>
    </SafeAreaView>
  )
}

const styles = (theme: DefaultTheme) =>
  StyleSheet.create({
    container: {
      ...media.vertical("padding", 12, 9),
      flex: 1,
      alignItems: 'stretch',
      backgroundColor: theme.mainBackground,
    },
  })

export default Home