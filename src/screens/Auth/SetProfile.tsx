import { DefaultText } from '@/components/DefaultText'
import { TouchableView } from '@/components/TouchableView'
import { GlobalState } from '@/modules'
import { DefaultTheme } from '@/style/styled'
import React, { useState } from 'react'
import { useCallback } from 'react'
import { useEffect } from 'react'
import { Text, TextInput } from 'react-native'
import { StyleSheet, View } from 'react-native'
import { SafeAreaView } from 'react-navigation'
import { useDispatch, useSelector } from 'react-redux'

interface SetProfileProps {
  route
}

function SetProfile({ route }: SetProfileProps) {
  const { theme } = useSelector((state: GlobalState) => state)
  const {
    container,
    categoryView,
    input,
    genderButton,
    genderButtonContainer,
    categoryContainer,
    confirmButton,
  } = styles(theme)
  // const {username, profile:{address, nickname, tel, email, gender}} = useSelector((state: GlobalState) => state.userAuth)
  const dispatch = useDispatch()
  const { text } = route.params

  //프로필 정보
  // const [address, setAddress] = useState<string>('')
  // const [nickname, setNickname] = useState<string>('')
  // const [tel, setTel] = useState<string>('')
  // const [email, setEmail] = useState<string>('')
  // const [gender, setGender] = useState<string>('')

  //프로필 정보 불러오기
  // useEffect(() => {
  //   setAddress(address)
  //   setNickname(nickname)
  //   setTel(tel)
  //   setEmail(email)
  //   setGender(gender)
  // }, [])

  // const onPress = useCallback(() => {
  //   // dispatch(setProfile({ address, nickname, tel, email, gender, token }))
  //   setAddress('')
  //   setNickname('')
  //   setTel('')
  //   setEmail('')
  //   setGender('')
  // }, [profile])
  return (
    <SafeAreaView style={container}>
      <View style={categoryContainer}>
        {/* <View style={categoryView}>
          <DefaultText text={'주소'} />
          <TextInput
            style={input}
            onChangeText={(text) => setAddress(text)}
            value={address}
          />
        </View>
        <View style={categoryView}>
          <DefaultText text={'닉네임'} />
          <TextInput
            style={input}
            onChangeText={(text) => setNickname(text)}
            value={nickname}
          />
        </View>
        <View style={categoryView}>
          <DefaultText text={'전화번호'} />
          <TextInput
            style={input}
            onChangeText={(text) => setTel(text)}
            value={tel}
          />
        </View>
        <View style={categoryView}>
          <DefaultText text={'이메일'} />
          <TextInput
            style={input}
            onChangeText={(text) => setEmail(text)}
            value={email}
          />
        </View>
        <View style={categoryView}>
          <DefaultText text={'성별'} />
          <View style={genderButtonContainer}>
            <TouchableView
              viewStyle={[
                genderButton,
                { backgroundColor: theme.content },
                gender === 'M' && { backgroundColor: theme.selected },
              ]}
              style={genderButton}
              onPress={() => {
                setGender('M')
              }}
            >
              <Text>M</Text>
            </TouchableView>
            <TouchableView
              viewStyle={[
                genderButton,
                { backgroundColor: theme.content },
                gender === 'F' && { backgroundColor: theme.selected },
              ]}
              onPress={() => {
                setGender('F')
              }}
            >
              <Text>F</Text>
            </TouchableView>
          </View>
        </View>
        <TouchableView onPress={onPress} viewStyle={confirmButton}>
          <Text>{text}</Text>
        </TouchableView> */}
      </View>
    </SafeAreaView>
  )
}

const styles = (theme: DefaultTheme) => {
  const { content, text, mainBackground, primary } = theme
  return StyleSheet.create({
    container: {
      backgroundColor: mainBackground,
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    categoryView: {
      flexDirection: 'column',
      marginBottom: 10,
    },
    input: {
      backgroundColor: content,
      marginVertical: 10,
      height: 30,
      padding: 5,
      borderRadius: 8,
    },
    genderButtonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginVertical: 10,
    },
    genderButton: {
      width: 100,
      height: 30,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 5,
    },
    categoryContainer: {
      width: 250,
    },
    confirmButton: {
      flexDirection: 'row',
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: primary.main,
      borderRadius: 5,
      height: 25,
    },
  })
}

export default SetProfile
