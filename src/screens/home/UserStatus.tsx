import { GlobalState } from '@/modules'
import { DefaultTheme } from '@/style/styled'
import React from 'react'
import { SafeAreaView, Text } from 'react-native'
import { StyleSheet } from 'react-native'
import { useSelector } from 'react-redux'
import { useFonts } from 'expo-font'
import { Rubik_400Regular } from '@expo-google-fonts/rubik'
import AppLoading from 'expo-app-loading'
import { useEffect } from 'react'
import { getUser } from '@/db/home/User'
import { IUser } from '@/utils/data'
import { Platform } from 'react-native'
interface UserStatusProps {
  user: IUser
}

function UserStatus({ user }: UserStatusProps) {
  const { theme } = useSelector((state: GlobalState) => state)
  const { regular, container } = styles(theme)
  let [fontsLoaded] = useFonts({
    Rubik_400Regular,
  })
  if (!fontsLoaded) {
    return <AppLoading />
  }

  return (
    <SafeAreaView style={container}>
      <Text style={[{ fontFamily: 'Rubik_400Regular' }, regular]}>
        여기 오늘 추천 사항
      </Text>
    </SafeAreaView>
  )
}

const styles = (theme: DefaultTheme) => {
  const { text, content } = theme

  let [fontsloaded] = useFonts({
    Rubik_400Regular,
  })

  return StyleSheet.create({
    container: {
      paddingTop: Platform.OS === 'android' ? 25 : 0,
    },
    regular: {
      color: text,
      fontSize: 30,
    },
  })
}

export default UserStatus
