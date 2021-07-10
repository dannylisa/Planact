import React from "react";
import type {FC, ReactNode, ComponentProps} from 'react'
import {StyleProp, TouchableOpacity,View, ViewStyle} from 'react-native'
//모든 버튼 기본 틀
type TouchableOpacityProps = ComponentProps<typeof TouchableOpacity>

export interface TouchableViewProps extends TouchableOpacityProps {
  children? : ReactNode
  viewStyle? : StyleProp<ViewStyle>
}

export default function TouchableView ({children,viewStyle, ...touchableProps}){
  return (
    <TouchableOpacity {...touchableProps}>
      <View style={[viewStyle]}>{children}</View>
    </TouchableOpacity>
  )
}
