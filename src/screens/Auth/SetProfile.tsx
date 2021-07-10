import { GlobalState } from '@/modules'
import useTheme from '@/modules/theme/hooks'
import { DefaultTheme } from '@/style/styled'
import React, { useCallback, useEffect, useState } from 'react'
import { StyleSheet, View, SafeAreaView } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import TextInput from '@/components/materials/TextInput'
import TextButton from '@/components/materials/TextButton'
import Text from '@/components/materials/Text'
import { FlatList } from 'react-native-gesture-handler'
import { useProfile, useUserState } from '@/modules/auth/hooks'
import { UserProfile } from '@/modules/auth/reducer'

type UserDetailInfoProps = {
  id: number
  text: string
}

const UserDetailInfo: UserDetailInfoProps[] = [
  {
    id: 0,
    text: '닉네임 설정',
  },
  {
    id: 1,
    text: '성별',
  },
  {
    id: 2,
    text: '이메일',
  },
  {
    id: 3,
    text: '전화번호',
  },
  {
    id: 4,
    text: '주소',
  },
]

function SetProfile({ route }) {
  const theme = useTheme()
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
  const { text } = route.params
  const { profile } = useUserState()
  const { setProfile } = useProfile()
  //profile 못 불러왔을 경우 대비해서 진행
  if (!profile) return
  const [userDetail, setUserDetail] = useState<UserProfile | null>(profile)
  //프로필 정보
  const [address, setAddress] = useState<string>('')
  const [nickname, setNickname] = useState<string>('')
  const [tel, setTel] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  //기본 값 null 설정하고 싶은데 이럴 경우 타입 지정 어떻게 하는지
  const [gender, setGender] = useState<'M' | 'F'>('M')

  //프로필 정보 불러오기
  useEffect(() => {
    setAddress(profile.address)
    setNickname(profile.nickname)
    setTel(profile.tel)
    setEmail(profile.email)
    setGender(profile.gender)
  }, [])

  const onPress = useCallback(() => {
    const profile: UserProfile = {
      nickname,
      gender,
      tel,
      email,
      address,
    }
    // setProfile(profile)
    // setAddress('')
    // setNickname('')
    // setTel('')
    // setEmail('')
    // setGender('M')
  }, [profile])
  return (
    <SafeAreaView style={container}>
      <View style={categoryView}>
        <Text content={'닉네임'} align={'left'} />
        <TextInput onChangeText={setNickname} value={nickname} />
        <Text content={'성별'} />
        <View style={genderButtonContainer}>
          <TextButton onPress={() => setGender('M')} content={'M'}></TextButton>
          <TextButton onPress={() => setGender('F')} content={'F'}></TextButton>
        </View>
        <Text content={'이메일'} />
        <TextInput onChangeText={setEmail} value={email} />
        <Text content={'전화번호'} />
        <TextInput onChangeText={setTel} value={tel} />
        <Text content={'주소'} />
        <TextInput onChangeText={setAddress} value={address} />
      </View>
      <TextButton onPress={onPress} content={'완료'} />
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
