import { GlobalState } from '@/modules'
import { DefaultTheme } from '@/style/styled'
import React, { FC } from 'react'
import { StyleProp, StyleSheet, TextStyle } from 'react-native'
import { Text } from 'react-native'
import { useSelector } from 'react-redux'

interface AccentTextProps {
  text: String
  textStyle?: StyleProp<TextStyle>
}
interface DetailTextProps {
  text: String
  textStyle?: StyleProp<TextStyle>
}

export const AccentText: FC<AccentTextProps> = ({ text, textStyle }) => {
  const { theme } = useSelector((state: GlobalState) => state)
  const { accentText } = styles(theme)
  return <Text style={[accentText, textStyle]}>{text}</Text>
}

export const DetailText: FC<DetailTextProps> = ({ text, textStyle }) => {
  const { theme } = useSelector((state: GlobalState) => state)
  const { detailText } = styles(theme)
  return <Text style={[detailText, textStyle]}>{text}</Text>
}

const styles = (theme: DefaultTheme) => {
  const { text } = theme
  return StyleSheet.create({
    accentText: {
      color: text,
      fontWeight: '800',
      fontSize: 16,
    },
    detailText: {
      fontWeight: '500',
      fontSize: 15,
      color: text,
    },
  })
}
