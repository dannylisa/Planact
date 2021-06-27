import { GlobalState } from '@/modules'
import { DefaultTheme } from '@/style/styled'
import React, { useState } from 'react'
import { StyleSheet, View, Text, SafeAreaView } from 'react-native'
import { useSelector } from 'react-redux'
import { getMarketPrograms, programs_dummy } from '@/db/market/MarketPrograms'
import ProgramSearch from './ProgramSearch'
import { IProgram } from '@/utils/data'
import { useEffect } from 'react'
import Program from './Program'

interface MarketProps {}

function Market({}: MarketProps) {
  const theme = useSelector(({ theme }: GlobalState) => theme)
  const { body } = styles(theme)
  const [programs, setPrograms] = useState<IProgram[]>([])
  const [isLoading, setIsLoading] = useState(true)

  //prettier-ignore
  useEffect(() => {
    (async () => {
      //Fetch Programs
      const newPrograms: IProgram[] = await getMarketPrograms()
      setPrograms(newPrograms)
      setIsLoading(false)
      
    })()}
  ,[])

  return (
    <SafeAreaView style={body}>
      <ProgramSearch />
      <View>
        <Program data={programs} isLoading={isLoading} />
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
  })
}

export default Market
