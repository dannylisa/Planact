import { GlobalState } from '@/modules'
import { DefaultTheme } from '@/style/styled'
import React, { useState } from 'react'
import { StyleSheet, View, Text, SafeAreaView } from 'react-native'
import { useSelector } from 'react-redux'
import ProgramSearch from './ProgramSearch'
import { IProgram, ISchedule } from '@/utils/data'
import { useEffect } from 'react'
import Program from './Program'
import { getMarketSchedules } from '@/db/market/MarketSchedules'

interface MarketProps {}

function Market({}: MarketProps) {
  const theme = useSelector(({ theme }: GlobalState) => theme)
  const { body, programView } = styles(theme)
  const [schedules, setSchedules] = useState<ISchedule[]>([])
  const [isLoading, setIsLoading] = useState(true)

  //prettier-ignore
  useEffect(() => {
    (async () => {
      //Fetch Programs
      const newSchedules: ISchedule[] = await getMarketSchedules()
      setSchedules(newSchedules)
      setIsLoading(false)
      
    })()}
  ,[])

  return (
    <SafeAreaView style={body}>
      <ProgramSearch />
      <View style={programView}>
        <Program data={schedules} isLoading={isLoading} />
      </View>
    </SafeAreaView>
  )
}

const styles = (theme: DefaultTheme) => {
  const { content, text } = theme
  return StyleSheet.create({
    body: {
      flex: 1,
      backgroundColor: theme.mainBackground,
      padding: 5,
    },
    programView: {
      flex: 1,
    },
  })
}

export default Market
