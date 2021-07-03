import React, { useState, useEffect } from 'react'
import dayjs from 'dayjs'
import { useDispatch, useSelector } from 'react-redux'
import DailyList from './DailyList'
import DailyView from './DailyView'
import { DefaultTheme } from '@/style/styled'
import { IDailyList, IUser } from '@/utils/data'
import { SafeAreaView, View, StyleSheet, TouchableOpacity } from 'react-native'
import { getDailyList } from '@/db/home/UserDailyData'
import { Alert } from 'react-native'
import { GlobalState } from '@modules/index'
import { getUserSchedule } from '@/db/home/UserScheduleData'
import { SCHEDULES_FETCH } from '@/modules/userSchedules'
import UserStatus from './UserStatus'
import { getUser, user_dummy } from '@/db/home/User'
import MonthChange from './MonthChange'
import axios from 'axios'
import { Text } from 'react-native'

// 1회당 가져올 날짜 수
const UNIT_FETCH_ONCE = 7
// 최대 가져올 날짜 수
const FETCH_LIMIT = 35
// DB에서 가져온 EVENT 데이터 + 비어있는 날짜 채우기
const fillEmptyDay = (dbData: IDailyList): IDailyList => {
  const from = dbData.start
  const to = dbData.end

  let idx = 0
  for (let i = 0; i <= to.diff(from, 'days'); i++) {
    const date = from.add(i, 'days')
    if (
      idx >= dbData.data.length ||
      dbData.data[idx].date.format('YYYYMMDD') != date.format('YYYYMMDD')
    ) {
      dbData.data.splice(idx, 0, {
        date,
        events: [],
      })
    }
    idx++
  }
  return dbData
}

export interface HomeProps {}

function Home({}: HomeProps) {
  const user_id = '111'
  const { theme, userSchedules } = useSelector((state: GlobalState) => state)
  const dispatch = useDispatch()
  const [loading, setLoading] = useState<Boolean>(true)

  const today = dayjs()
  const [dailylist, setDailylist] = useState<IDailyList>({
    start: today,
    end: today,
    data: [],
  })
  const [selected, setSelected] = useState<number>(0)
  const { start, end, data } = dailylist
  const [user, setUser] = useState<IUser>(user_dummy)

  //prettier-ignore
  useEffect(() => {
    ((async () => {
      // Fetch Schedules
      const schedules = await getUserSchedule(user_id)
      const user = await getUser()
      setUser(user)
      dispatch({ type: SCHEDULES_FETCH, schedules })

      // Fetch Events
      let newDailyListData: IDailyList = await getDailyList({
        user_id,
        start,
        end: today.add(UNIT_FETCH_ONCE - 1, 'days'),
      })
      newDailyListData = fillEmptyDay(newDailyListData)
      setDailylist(newDailyListData)
      setLoading(false)
    }))()
  }, [])
  // 7일치 데이터
  const loadAfterData = async () => {
    const newStart = end.add(1, 'days')
    const newEnd = end.add(UNIT_FETCH_ONCE, 'days')
    let newDailyListData: IDailyList = await getDailyList({
      user_id,
      start: newStart,
      end: newEnd,
    })
    newDailyListData = fillEmptyDay(newDailyListData)
    setDailylist({
      start,
      end: newEnd,
      data: data.concat(newDailyListData.data),
    })
  }
  const loadBeforeData = async () => {
    const newStart = start.subtract(UNIT_FETCH_ONCE, 'days')
    const newEnd = start.subtract(1, 'days')
    let newDailyListData: IDailyList = await getDailyList({
      user_id,
      start: newStart,
      end: newEnd,
    })
    newDailyListData = fillEmptyDay(newDailyListData)
    setDailylist({
      start: newStart,
      end,
      data: newDailyListData.data.concat(data),
    })
    setSelected((prev) => prev + UNIT_FETCH_ONCE)
  }

  const loader = async (after: boolean) => {
    if (end.diff(start, 'days') > FETCH_LIMIT) {
      Alert.alert('최대 5주까지 가능합니다.')
      return
    }
    setLoading(true)
    const load = after ? loadAfterData : loadBeforeData
    load().then(() => setLoading(false))
  }

  return (
    <SafeAreaView style={styles(theme).container}>
      {/* <UserStatus user={user}></UserStatus> */}
      <MonthChange></MonthChange>
      <View style={{ minHeight: 140 }}>
        <DailyList
          loading={loading}
          loader={loader}
          selector={setSelected}
          selected={selected}
          {...dailylist}
        />
      </View>
      <View style={{ flex: 1 }}>
        {!loading && <DailyView {...dailylist.data[selected]} />}
      </View>
      <TouchableOpacity
        onPress={() => {
          const data = JSON.stringify({
            username: 'dsfsfs',
            password: 'sdfsdfsdf',
          })
          axios
            .post('http://3.35.169.23/account/auth/login/', data, {
              headers: {
                'Content-Type': 'application/json',
              },
            })
            .then((data) => {
              Alert.alert(JSON.stringify(data))
            })
        }}
      >
        <Text>checkbutton</Text>
      </TouchableOpacity>
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
