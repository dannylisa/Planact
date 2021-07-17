import useTheme from '@/modules/theme/hooks';
import { DefaultTheme } from '@/style/styled';
import React, { useEffect, useState } from 'react';
import { Alert, Platform, SafeAreaView, StyleSheet, View } from 'react-native';
import TextInput from '@/components/materials/TextInput';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Text from '@/components/materials/Text';
import { useProfile, useUserState } from '@/modules/auth/hooks';
import { UserProfile } from '@/modules/auth/reducer';
import { Button } from '@components/materials';

function SetProfile({ route }) {
  const theme = useTheme();
  const {
    container,
    item,
    item_and,
    genderButtonContainer,
    wrapper,
    wrapper_and,
  } = React.useMemo(() => styles(theme), [theme]);
  const isAnd = Platform.OS === 'android';
  //다른 컴포넌트에서 navigation으로 올 때 버튼 text 전달
  //ex) 가입하기 or 프로필 변경

  const { username, profile, forceLogOut } = useUserState();
  const { setProfile } = useProfile();

  //프로필 정보
  const [address, setAddress] = useState<string>('');
  const [nickname, setNickname] = useState<string>('');
  const [tel, setTel] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [gender, setGender] = useState<'M' | 'F' | null>(null);

  //프로필 정보 불러오기
  useEffect(() => {
    if (profile) {
      setAddress(profile.address);
      profile.nickname.indexOf('__init__') === -1
        ? setNickname(profile.nickname)
        : setNickname('');
      setTel(profile.tel);
      setEmail(profile.email);
      setGender(profile.gender);
    }
  }, []);

  const onPress = () => {
    if (!nickname) return Alert.alert('별명을 입력해주세요!');
    if (!gender) return Alert.alert('성별을 선택해주세요!');
    // 전화번호 에러 처리
    if (!tel) return Alert.alert('전화번호를 입력해주세요!');
    const retel = /^\d{11}$/;
    if (!retel.test(tel)) return Alert.alert('전화번호 형식이 잘못되었습니다.');
    var regEmail =
      /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
    if (!email) return Alert.alert('이메일 주소를 입력해주세요!');
    if (!regEmail.test(email))
      return Alert.alert('이메일 형식이 잘못되었습니다.');

    const profile: UserProfile = {
      address,
      nickname,
      gender,
      tel,
      email,
    };
    setProfile(profile);
    Alert.alert('변경되었습니다.');
  };

  const Wrapper =
    Platform.OS === 'android' ? KeyboardAwareScrollView : SafeAreaView;
  return (
    <Wrapper style={container}>
      <View style={[wrapper, isAnd && wrapper_and]}>
        <View style={[item, isAnd && item_and]}>
          <Text bold headings={1} content={`${username}님,`} align="left" />
          <Text
            bold
            headings={1}
            content={`회원정보를 입력해주세요!`}
            align="left"
          />
        </View>
        <View style={[item, isAnd && item_and]}>
          <Text content="별명" align="left" />
          <TextInput underlined onChangeText={setNickname} value={nickname} />
        </View>
        <View style={[item, isAnd && item_and]}>
          <Text content="성별" align="left" />
          <View style={genderButtonContainer}>
            <Button
              onPress={() => setGender('M')}
              content={'남성'}
              color={gender === 'M' ? 'primary' : 'secondary'}
              flex={1}
            />
            <View style={{ width: 12 }} />
            <Button
              onPress={() => setGender('F')}
              content={'여성'}
              color={gender === 'F' ? 'primary' : 'secondary'}
              flex={1}
            />
          </View>
        </View>
        <View style={[item, isAnd && item_and]}>
          <Text content="이메일" align="left" />
          <TextInput underlined onChangeText={setEmail} value={email} />
        </View>
        <View style={[item, isAnd && item_and]}>
          <Text content="전화번호" align="left" />
          <TextInput
            underlined
            onChangeText={setTel}
            value={tel}
            placeholder="숫자만 입력해주세요."
          />
        </View>
        <View style={[item, { height: 90 }]}>
          <Button
            onPress={onPress}
            // content={userDetail.nickname.length > 8 && userDetail.nickname.substr(0,8) ===  "__init__" && '완료'}
            content="완료"
            color={'primary'}
            style={item}
          />
        </View>
      </View>
    </Wrapper>
  );
}
//TODO: 가입하기 수정하기는 닉네임 __init__에 따라서 보여주기
const styles = (theme: DefaultTheme) => {
  const { content, text, mainBackground, primary } = theme;

  return StyleSheet.create({
    container: {
      backgroundColor: mainBackground,
      flex: 1,
    },
    wrapper: {
      padding: 32,
      flex: 1,
      paddingTop: 50,
    },
    wrapper_and: {
      paddingTop: 10,
    },
    item: {
      marginBottom: 40,
    },
    item_and: {
      marginBottom: 15,
    },
    genderButtonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      marginVertical: 10,
    },
  });
};

export default SetProfile;
