import { TouchableView } from '@/components/TouchableView'
import { GlobalState } from '@/modules'
import { login, register } from '@/modules/userAuth'
import Navigation from '@/navigation'
import { DefaultTheme } from '@/style/styled'
import React, { useState } from 'react'
import { Image } from 'react-native'
import { StyleSheet, Text, View } from 'react-native'
import { TextInput } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-navigation'
import { useDispatch, useSelector } from 'react-redux'

interface AuthProps {
  navigation
}

function Auth({ navigation }: AuthProps) {
  const { theme } = useSelector((state: GlobalState) => state)
  const { container, input, button } = styles(theme)
  const { token, loading, error } = useSelector(
    (state: GlobalState) => state.userAuth
  )
  const [username, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const onChange = (e) => {}
  const dispatch = useDispatch()
  const username1 = 'planact'
  const password1 = 'planact123!'
  return (
    <SafeAreaView style={container}>
      <Image
        source={require('@/assets/img/planact.jpg')}
        style={{ width: 250, height: 100, marginBottom: 100 }}
      />
      <TextInput
        style={input}
        value={username}
        onChangeText={(text) => setUserName(text)}
        placeholder="사용자 이름"
      />

      <TextInput
        style={input}
        value={password}
        onChangeText={(text) => setPassword(text)}
        placeholder="비밀번호"
        secureTextEntry={true}
      />

      <TouchableView
        style={button}
        onPress={() => {
          dispatch(login({ username, password }))
          setPassword('')
          setUserName('')
        }}
      >
        <Text>로그인</Text>
      </TouchableView>
      <Text>또는 </Text>
      <TouchableView
        style={button}
        onPress={() => {
          dispatch(register({ username, password }))
          setUserName('')
          setPassword('')
          navigation.push('SetProfile')
        }}
      >
        <Text>회원가입</Text>
      </TouchableView>
    </SafeAreaView>
  )
}

const styles = (theme: DefaultTheme) => {
  const { content, text, mainBackground, selected, primary, secondary } = theme
  return StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: mainBackground,
    },
    input: {
      backgroundColor: content,
      color: text,
      borderRadius: 5,
      marginBottom: 10,
      width: 200,
      height: 30,
    },
    button: {
      backgroundColor: primary.main,
      color: primary.text,
      borderColor: primary.border,
      borderWidth: 5,
      width: 200,
      height: 30,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
  })
}

export default Auth
