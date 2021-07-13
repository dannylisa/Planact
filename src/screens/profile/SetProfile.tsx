import useTheme from '@/modules/theme/hooks';
import { DefaultTheme } from '@/style/styled';
import React, { useEffect, useState } from 'react';
import {
  KeyboardAvoidingView,
  SafeAreaView,
  StyleSheet,
  View,
} from 'react-native';
import TextInput from '@/components/materials/TextInput';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Text from '@/components/materials/Text';
import { FlatList } from 'react-native-gesture-handler';
import { useProfile, useUserState } from '@/modules/auth/hooks';
import { UserProfile } from '@/modules/auth/reducer';
import { Button } from '@components/materials';
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
  const { container, categoryView, category, genderButtonContainer } =
    styles(theme);

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
  const [flag, setFlat] = useState<boolean>(false);
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

  return (
    <KeyboardAwareScrollView>
      <View style={container}>
        <View style={categoryView}>
          <View style={category}>
            <Text content={'닉네임'} align={'left'} marginVertical={10} />
            <TextInput onChangeText={setNickname} value={nickname} />
          </View>
          <View style={category}>
            <Text content={'성별'} align={'left'} marginVertical={10} />
            <View style={genderButtonContainer}>
              <Button
                onPress={() => setGender('M')}
                content={'남성'}
                color={gender === 'M' ? 'primary' : 'secondary'}
              />
              <View style={{ width: 10 }} />
              <Button
                onPress={() => setGender('F')}
                content={'여성'}
                color={gender === 'F' ? 'primary' : 'secondary'}
              />
            </View>
          </View>
          <View style={category}>
            <Text content={'이메일'} align={'left'} marginVertical={10} />
            <TextInput onChangeText={setEmail} value={email} />
          </View>
          <View style={category}>
            <Text content={'전화번호'} align={'left'} marginVertical={10} />
            <TextInput onChangeText={setTel} value={tel} />
          </View>
          <View style={[category, { marginBottom: 10 }]}>
            <Text content={'주소'} align={'left'} marginVertical={10} />
            <TextInput onChangeText={setAddress} value={address} />
          </View>
        </View>
        <Button
          onPress={onPress}
          // content={userDetail.nickname.length > 8 && userDetail.nickname.substr(0,8) ===  "__init__" && '완료'}
          content={'완료'}
          color={'primary'}
          flex={0}
          style={category}
        />
      </View>
    </KeyboardAwareScrollView>
  );
}
//TODO: 가입하기 수정하기는 닉네임 __init__에 따라서 보여주기
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
    category: {
      width: 275,
    },
    genderButtonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      marginVertical: 10,
    },
  });
};

export default SetProfile;
