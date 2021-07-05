import { GlobalState } from '@/modules'
import { DefaultTheme } from '@/style/styled'
import React from 'react'
import { StyleSheet, View } from 'react-native'
import { useSelector } from 'react-redux'

interface BasketProps {}

function Basket({}: BasketProps) {
  const { theme } = useSelector((state: GlobalState) => state)
  const { container } = styles(theme)

  return <View style={container}></View>
}

const styles = (theme: DefaultTheme) => {
  const { content, text } = theme
  return StyleSheet.create({
    container: {},
  })
}

export default Basket
