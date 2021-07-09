import { GlobalState } from '@/modules'
import useTheme from '@/modules/theme/hooks'
import { DefaultTheme } from '@/style/styled'
import React, { FC, useMemo } from 'react'
import { StyleProp, StyleSheet, TextStyle } from 'react-native'
import { TextProps } from 'react-native'
import { Text as DefaultText } from 'react-native'
import { useSelector } from 'react-redux'

interface AdditionalProps {
  bold?: boolean
  align?: "left" | "right" | "center"
  // flex: 0 => none
  flex?: number
  headings?: number
  marginVertical?: number
  marginHorizontal?: number
  paddingVertical?: number
  paddingHorizontal?: number
}
export interface DefaultTextProps extends AdditionalProps, TextProps {
  content: string
}

export default function Text({style,content,...props}:DefaultTextProps){
  const theme = useTheme();
  const { defaultStyle } = useMemo(() => styles(theme, props), [theme, props])
  return <DefaultText style={[defaultStyle, style]}>{content}</DefaultText>
}

const headingsSize = [24, 22, 18, 16, 12, 10];
const styles = ({text}: DefaultTheme, props: AdditionalProps) => {
  let {bold, align, flex, headings, marginHorizontal, marginVertical, paddingHorizontal, paddingVertical} = props;
  const fontWeight = bold ? '800' : '500'
  align = align || "center"
  flex = flex || 0;
  const fontSize = headings ? headingsSize[headings] : 16;
  
  return StyleSheet.create({
    defaultStyle: {
      color: text,
      textAlign: align,
      alignContent: 'center',
      fontWeight,
      fontSize,
      flex,
      paddingHorizontal,
      paddingVertical,
      marginHorizontal,
      marginVertical
    },
  })
}
