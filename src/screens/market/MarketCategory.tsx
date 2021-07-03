import { GlobalState } from '@/modules'
import { DefaultTheme } from '@/style/styled'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { useSelector } from 'react-redux'

interface MarketCategoryProps {
  category: string
}

function MarketCategory({ category }: MarketCategoryProps) {
  const { theme } = useSelector((state: GlobalState) => state)
  const { container } = styles(theme)

  return (
    <View style={container}>
      <Text>{category}</Text>
    </View>
  )
}

const styles = (theme: DefaultTheme) => {
  const { content, text } = theme
  return StyleSheet.create({
    container: {},
  })
}

export default MarketCategory
