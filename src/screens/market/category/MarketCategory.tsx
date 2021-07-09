import { GlobalState } from '@/modules'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import useTheme from '@/modules/theme/hooks'
import { DefaultTheme } from '@/style/styled'
import { FlatList, SafeAreaView, StyleSheet, View } from 'react-native'
import { Text } from '@components/materials'
import { getMarketSchedulesByCategory } from '@/api/market/MarketSchedules'
import { AxiosError, AxiosResponse } from 'axios'
import { ISchedule } from '@/utils/data'
import { useUserState } from '@/modules/auth/hooks'
import ScheduleListItem from './ScheduleListItem'

function MarketCategory({ route }) {
  const { category } = route.params
  const theme = useTheme()
  const { getToken, forceLogOut } = useUserState();
  const { container, title, listItemWrapper } = useMemo(() => styles(theme), [theme])
  const [schedules, setSchedules] = useState<ISchedule[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    (async () => {
      const token = await getToken();
      if(!token) return;

      //Fetch Programs
      await getMarketSchedulesByCategory(token, category)
        .then((res:AxiosResponse<ISchedule[]>) => setSchedules(res.data))
        .catch((err:AxiosError) => {
          console.log(err.response)
        })
      setIsLoading(false)
    })()}
  ,[])
  
  const renderItem = ({item}) => {
    return (
      <ScheduleListItem schedule={item} />
    )
  }
  return (
    <SafeAreaView style={container}>
      <View style={title}>
        <Text content={category}/>
      </View>
      <FlatList
        data={[...schedules, ...schedules, ...schedules, ...schedules, ...schedules]}
        // data={schedules}
        renderItem={renderItem}
        keyExtractor={useCallback((item:ISchedule, index:number) => ""+index, [])}
        contentContainerStyle={listItemWrapper}
      />
    </SafeAreaView>
  )
}

const styles = (theme: DefaultTheme) => {
  const { mainBackground } = theme
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: mainBackground
    },
    title: {
      height: 50
    },
    listItemWrapper: {
      flex: 5,
      paddingHorizontal: 20,
      justifyContent:'flex-start',
    }
  })
}

export default MarketCategory
function setIsLoading(arg0: boolean) {
  throw new Error('Function not implemented.')
}

