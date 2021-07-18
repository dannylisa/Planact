import useTheme from '@/modules/theme/hooks'
import media from '@/style/media'
import { DefaultTheme } from '@/style/styled'
import React, { FC, useMemo } from 'react'
import { StyleProp, StyleSheet, TextStyle } from 'react-native'
import { TextProps } from 'react-native'
import { Text as DefaultText } from 'react-native'

interface AdditionalProps {
  bold?: boolean
  align?: "left" | "right" | "center"
  flex?: number
  color?: string
  headings?: number
  marginVertical?: number
  marginTop?: number
  marginBottom?: number
  marginHorizontal?: number
  marginLeft?: number
  marginRight?: number
  paddingVertical?: number
  paddingHorizontal?: number
}
export interface DefaultTextProps extends AdditionalProps, TextProps {
  content: string | number
}

export default function Text({style,content, ...props}:DefaultTextProps){
  const theme = useTheme();
  const { defaultStyle } = useMemo(() => styles(theme, props), [theme, props])
  return (
    <DefaultText style={[defaultStyle, style]}>{content}</DefaultText>
  )
}

const headingsSize = [32, 22, 18, 16, 14, 12, 10];
const styles = ({text}: DefaultTheme, props: AdditionalProps) => {
  let {bold, align, flex, headings, color,
      marginHorizontal, marginVertical, marginTop, marginBottom, marginLeft,
      marginRight,paddingHorizontal, paddingVertical} = props;
  const fontWeight = bold ? '800' : '500'
  align = align || "center"
  flex = flex || 0;
  const fontSize = headings ? headingsSize[headings] : 16;
  return StyleSheet.create({
    defaultStyle: {
      color: color || text,
      textAlign: align,
      alignContent: 'center',
      fontWeight,
      ...media.vertical('fontSize', fontSize, fontSize-0.6, fontSize-1.2),
      flex,
      paddingHorizontal,
      paddingVertical,
      marginTop,
      marginBottom,
      marginLeft,
      marginRight,
      marginHorizontal,
      marginVertical
    },
  })
}
