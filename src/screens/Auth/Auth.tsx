import { DefaultTheme } from '@/style/styled'
import React, { useMemo, useState } from 'react'
import { Image } from 'react-native'
import { StyleSheet, View, SafeAreaView } from 'react-native'
import { TextInput, Button, TextButton, Text } from '@components/materials'

import { useAuthorization } from '@/modules/auth/hooks'
import useTheme from '@/modules/theme/hooks'
import { kakao_api } from '@/api/auth'

function Auth() {
  const theme = useTheme()
  const { wrapper, container, item } = useMemo(() => styles(theme), [theme])

  // true: 로그인  false: 회원가입
  const [loginMode, setLoginMode] = useState<boolean>(true)
  const toggleLoginMode = () => setLoginMode((prev) => !prev)

  //form
  const { logIn, signUp } = useAuthorization()
  const [username, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [password2, setPassword2] = useState('')

  const onLogin = () => {
    logIn({ username, password })
    setPassword('')
  }
  const onSignUp = () => {
    signUp({ username, password, password2 })
  }

  const [html, setHtml] = useState("");
  const onKakao = async () => {
    const redirect = await kakao_api()
    setHtml(redirect)
  }

  return (
    <SafeAreaView style={wrapper}>
      <View style={container}>
        <Text 
          content="PLANACT" 
          style={{
            fontSize:36,
            fontWeight: "800",
            marginBottom: loginMode? 60: 25
          }} 
        />
        {
          !loginMode &&
          <Text 
            content="회원가입" 
            headings={2}
            marginBottom={35}
          />
        }

        {/* 카카오
        <Button
          flex={0}
          style={item}
          color="primary"
          content={'카카오톡 로그인'}
          onPress={onKakao}
        /> */}

        <TextInput
          value={username}
          style={item}
          onChangeText={setUserName}
          placeholder="ID"
        />
        <TextInput
          value={password}
          style={item}
          onChangeText={setPassword}
          placeholder="비밀번호"
          secureTextEntry={true}
        />
        {!loginMode && (
          <TextInput
            value={password2}
            style={item}
            onChangeText={setPassword2}
            placeholder="비밀번호 확인"
            secureTextEntry={true}
          />
        )}
        <Button
          flex={0}
          style={item}
          color="primary"
          content={loginMode ? '로그인' : '회원가입'}
          onPress={loginMode ? onLogin : onSignUp}
        />
        <TextButton
          style={{ marginTop: 40 }}
          underlined
          content={
            loginMode
              ? '아직 PLANACT 계정이 없으신가요?'
              : 'PLANACT 계정으로 로그인하기'
          }
          onPress={toggleLoginMode}
        />
      </View>
    </SafeAreaView>
  )
}

const styles = (theme: DefaultTheme) => {
  const { mainBackground } = theme
  return StyleSheet.create({
    wrapper: {
      backgroundColor: mainBackground,
      flex: 1,
    },
    container: {
      flex: 1,
      backgroundColor: mainBackground,
      justifyContent: 'center',
      alignItems: 'center',
    },
    item: {
      marginBottom: 10,
      width: 250,
    },
  })
}

export default Auth
