import { GlobalState } from '@/modules';
import useTheme from '@/modules/theme/hooks';
import { DefaultTheme } from '@/style/styled';
import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, View, SafeAreaView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import TextInput from '@/components/materials/TextInput';

import Text from '@/components/materials/Text';
import { FlatList } from 'react-native-gesture-handler';
import { useProfile, useUserState } from '@/modules/auth/hooks';
import { UserProfile } from '@/modules/auth/reducer';
import { TextButton } from '@components/materials';
type UserDetailInfoProps = {
  id: number;
  text: string;
  func:
    | React.Dispatch<React.SetStateAction<string>>
    | React.Dispatch<React.SetStateAction<'M' | 'F' | null>>;
  val: string | 'M' | 'F' | null;
};

function SetProfile({ route }) {
  const theme = useTheme();
  const { container, categoryView, genderButtonContainer } = styles(theme);

  //다른 컴포넌트에서 navigation으로 올 때 버튼 text 전달
  //ex) 가입하기 or 프로필 변경

  const { text } = route.params;
  const { profile } = useUserState();
  const { setProfile } = useProfile();
  //profile 못 불러왔을 경우 대비해서 진행

  const [userDetail, setUserDetail] = useState<UserProfile | null>(profile);
  //프로필 정보
  const [address, setAddress] = useState<string>('');
  const [nickname, setNickname] = useState<string>('');
  const [tel, setTel] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  //기본 값 null 설정하고 싶은데 이럴 경우 타입 지정 어떻게 하는지
  const [gender, setGender] = useState<'M' | 'F' | null>(null);

  const UserDetailInfo: UserDetailInfoProps[] = [
    {
      id: 0,
      text: '닉네임',
      func: setNickname,
      val: nickname,
    },
    {
      id: 1,
      text: '성별',
      func: setGender,
      val: gender,
    },
    {
      id: 2,
      text: '이메일',
      func: setEmail,
      val: email,
    },
    {
      id: 3,
      text: '전화번호',
      func: setTel,
      val: tel,
    },
    {
      id: 4,
      text: '주소',
      func: setAddress,
      val: address,
    },
  ];

  //프로필 정보 불러오기
  useEffect(() => {
    if (profile) {
      setAddress(profile.address);
      setNickname(profile.nickname);
      setTel(profile.tel);
      setEmail(profile.email);
      setGender(profile.gender);
      setUserDetail(profile);
    }
  }, []);

  const onPress = () => {
    if (gender !== null) {
      const profile: UserProfile = {
        address,
        nickname,
        gender,
        tel,
        email,
      };
      if (JSON.stringify(profile) !== JSON.stringify(userDetail)) {
        console.log(JSON.stringify(profile));
        console.log(JSON.stringify(userDetail));
        setProfile(profile);
      }
    }
  };
  const renderItem = ({ item }) => {
    if (item.text === '성별') {
      return (
        <View style={genderButtonContainer}>
          <TextButton onPress={() => setGender('M')} content={'M'}></TextButton>
          <TextButton onPress={() => setGender('F')} content={'F'}></TextButton>
        </View>
      );
    }
    return (
      <View>
        <Text content={item.text} align={'left'} />
        <TextInput onChangeText={item.func} value={item.val} />
      </View>
    );
  };
  return (
    <SafeAreaView style={container}>
      <View style={categoryView}>
        <FlatList
          data={UserDetailInfo}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
      <TextButton onPress={onPress} content={'완료'} />
    </SafeAreaView>
  );
}

const styles = (theme: DefaultTheme) => {
  const { content, text, mainBackground, primary } = theme;
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
    genderButtonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginVertical: 10,
    },
  });
};

export default SetProfile;
