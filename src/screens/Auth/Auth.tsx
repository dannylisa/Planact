import { DefaultTheme } from '@/style/styled'
import React, { useMemo, useState } from 'react'
import { Image } from 'react-native'
import { StyleSheet, View } from 'react-native'
import { TextInput, Button, TextButton } from '@components/materials'
import { SafeAreaView } from 'react-navigation'
import { useAuthorization } from '@/modules/auth/hooks'
import useTheme from '@/modules/theme/hooks'
import AsyncStorage from '@react-native-async-storage/async-storage'

function Auth() {
  const theme = useTheme();
  const { wrapper, container, item } = useMemo(()=>styles(theme), [theme]);

  // true: 로그인  false: 회원가입
  const [loginMode, setLoginMode] = useState<boolean>(true);
  const toggleLoginMode = () => setLoginMode(prev => !prev);

  //form
  const {logIn, signUp} = useAuthorization();
  const [username, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [password2, setPassword2] = useState('')

  const onLogin = () => {
    logIn({username, password});
    setPassword('')
  }
  const onSignUp = () => {
    signUp({username, password, password2});
  }

  return (
    <SafeAreaView style={wrapper}>
      <View style={container}>
        <Image
          source={require('@/assets/img/planact.jpg')}
          style={{ width: 250, height: 100, marginBottom: 100 }}
        />
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
        {!loginMode &&
          <TextInput
            value={password2}
            style={item}
            onChangeText={setPassword2}
            placeholder="비밀번호 확인"
            secureTextEntry={true}
          />
        }
        <Button
          flex={0}
          style={item}
          color="primary"
          content={loginMode ? "로그인" : "회원가입"}
          onPress={loginMode ? onLogin : onSignUp}
        />
        <TextButton
          style={{marginTop: 60}}
          underlined
          content={loginMode ? "아직 PLANACT 계정이 없으신가요?" : "PLANACT 계정으로 로그인하기"}
          onPress={toggleLoginMode}
          />
      </View>
    </SafeAreaView>
  )
}

const styles = (theme: DefaultTheme) => {
  const { mainBackground } = theme
  return StyleSheet.create({
    wrapper:{
      backgroundColor: mainBackground,
      flex: 1,
    },
    container: {
      flex: 1,
      backgroundColor: mainBackground,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 60
    },
    item:{
      marginBottom:10,
      width: 250
    }
  })
}

export default Auth
