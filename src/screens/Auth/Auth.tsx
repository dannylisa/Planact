import { TouchableView } from '@/components/TouchableView'
import { GlobalState } from '@/modules'
import { login } from '@/modules/userAuth'
import { DefaultTheme } from '@/style/styled'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'

interface AuthProps {}

function Auth({}: AuthProps) {
  const { theme } = useSelector((state: GlobalState) => state)
  const { container } = styles(theme)
  const { token, loading, error } = useSelector(
    (state: GlobalState) => state.userAuth
  )
  const dispatch = useDispatch()
  const username = 'planact'
  const password = 'planact123!'
  return (
    <View style={container}>
      <TouchableView
        onPress={() => {
          dispatch(login({ username, password }))
        }}
      >
        <Text>login</Text>
      </TouchableView>
    </View>
  )
}

const styles = (theme: DefaultTheme) => {
  const { content, text } = theme
  return StyleSheet.create({
    container: {},
  })
}

export default Auth
