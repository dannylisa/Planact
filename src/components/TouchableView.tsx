import React from "react";
import type {FC, ReactNode, ComponentProps} from 'react'
import {StyleProp, TouchableOpacity,View, ViewStyle} from 'react-native'
//모든 버튼 기본 틀
type TouchableOpacityProps = ComponentProps<typeof TouchableOpacity>

export type TouchableViewProps = TouchableOpacityProps &{
  children? : ReactNode
  viewStyle? : StyleProp<ViewStyle>
}

export const TouchableView : FC<TouchableViewProps> = ({
  children,viewStyle, ...touchableProps
}) =>{
  return (
    <TouchableOpacity {...touchableProps}>
      <View style={[viewStyle]}>{children}</View>
    </TouchableOpacity>
  )
}
