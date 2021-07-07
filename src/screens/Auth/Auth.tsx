import { TouchableView } from '@/components/TouchableView'
import { GlobalState } from '@/modules'
import Navigation from '@/navigation'
import { DefaultTheme } from '@/style/styled'
import React, { useState } from 'react'
import { Image } from 'react-native'
import { StyleSheet, Text, View } from 'react-native'
import { TextInput, Button } from '@components/materials'
import { SafeAreaView } from 'react-navigation'
import { useDispatch, useSelector } from 'react-redux'
import { useAuthorization } from '@/modules/auth/hooks'

interface AuthProps {

}

function Auth({ }: AuthProps) {
  const { theme } = useSelector((state: GlobalState) => state)
  const { wrapper, container, item } = styles(theme);
  const [username, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const {logIn, logOut, signUp} = useAuthorization()

  const onLogin = async () => {
    await logIn({username, password});
    setPassword('')
    setUserName('')
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
          placeholder="Password"
          secureTextEntry={true}
        />
        <Button
          style={item}
          color="primary"
          content="로그인"
          onPress={onLogin}
        />
      </View>
    </SafeAreaView>
  )
}

const styles = (theme: DefaultTheme) => {
  const { content, text, mainBackground, selected, primary, secondary } = theme
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
      marginBottom: 80
    },
    item:{
      marginBottom:10,
      width: 250
    }
  })
}

export default Auth
