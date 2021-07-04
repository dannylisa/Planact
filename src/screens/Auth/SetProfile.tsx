import { DefaultText } from '@/components/DefaultText'
import { TouchableView } from '@/components/TouchableView'
import { GlobalState } from '@/modules'
import { DefaultTheme } from '@/style/styled'
import React, { useState } from 'react'
import { Text, TextInput } from 'react-native'
import { StyleSheet, View } from 'react-native'
import { SafeAreaView } from 'react-navigation'
import { useSelector } from 'react-redux'

interface SetProfileProps {}

function SetProfile({}: SetProfileProps) {
  const { theme } = useSelector((state: GlobalState) => state)
  const { container, categoryView, input } = styles(theme)
  //프로필 정보
  const [address, setAddress] = useState('')
  const [nickname, setNickname] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [gender, setGender] = useState('')
  return (
    <SafeAreaView style={container}>
      <View style={categoryView}>
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
          onChangeText={(text) => setPhone(text)}
          value={phone}
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
        <TextInput
          style={input}
          onChangeText={(text) => setGender(text)}
          value={gender}
        />
      </View>
      <TouchableView>
        <Text>가입하기</Text>
      </TouchableView>
    </SafeAreaView>
  )
}

const styles = (theme: DefaultTheme) => {
  const { content, text, mainBackground } = theme
  return StyleSheet.create({
    container: {
      backgroundColor: mainBackground,
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    categoryView: {
      flexDirection: 'row',
      marginBottom: 10,
    },
    input: {
      backgroundColor: content,
    },
  })
}

export default SetProfile
