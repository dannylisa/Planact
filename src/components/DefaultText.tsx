import { GlobalState } from '@/modules'
import { DefaultTheme } from '@/style/styled'
import React, { FC } from 'react'
import { StyleProp, StyleSheet, TextStyle } from 'react-native'
import { Text } from 'react-native'
import { useSelector } from 'react-redux'

interface DefaultTextProps {
  text: String
  textStyle?: StyleProp<TextStyle>
  bold?: boolean
}

export const DefaultText: FC<DefaultTextProps> = ({
  text,
  textStyle,
  bold,
}) => {
  const { theme } = useSelector((state: GlobalState) => state)
  const { defaultText } = styles(theme, bold || false)
  return <Text style={[defaultText, textStyle]}>{text}</Text>
}

const styles = (theme: DefaultTheme, bold: boolean) => {
  const { text } = theme
  const fontWeight = bold ? '800' : '500'
  return StyleSheet.create({
    defaultText: {
      color: text,
      fontWeight,
      fontSize: 16,
    },
  })
}
