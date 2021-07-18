import React, { useCallback, useEffect, useMemo, useState } from 'react';
import useTheme from '@/modules/theme/hooks';
import { DefaultTheme } from '@/style/styled';
import {
  Alert,
  FlatList,
  Platform,
  SafeAreaView,
  StyleSheet,
  View,
} from 'react-native';
import { Button, SearchInput, Text } from '@components/materials';
import { AxiosError, AxiosResponse } from 'axios';
import { useUserState } from '@/modules/auth/hooks';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Category, { CategoryProps } from './Category';
import { ScrollView } from 'react-native-gesture-handler';
import { getTrends } from '@/api/market';

const styles = (theme: DefaultTheme) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.mainBackground,
    },
    title: {
      backgroundColor: theme.mainBackground,
      paddingHorizontal: 12,
      marginVertical: 5,
    },
    scroll: {
      flexGrow: 1,
      height: 50,
      paddingVertical: 6,
    },
    button: {
      paddingHorizontal: 18,
      marginRight: 10,
    },
  });
};

const initCategory: CategoryProps = {
  name: "What's New?",
  keyword: 'all',
};
function MarketMain() {
  const theme = useTheme();
  const { getToken } = useUserState();
  const { container, title, scroll, button } = useMemo(
    () => styles(theme),
    [theme]
  );

  const [Categories, setCategories] = useState<CategoryProps[]>([initCategory]);
  const [categoryIdx, setCategoryIdx] = useState<number>(0);
  const selectCategory = (idx: number) => () => setCategoryIdx(idx);

  const [search, setSearch] = useState<string>('');

  useEffect(() => {
    getToken()
      .then((token) => {
        if (token) return getTrends(token);
        else throw Error;
      })
      .then((res: AxiosResponse<CategoryProps[]>) => {
        setCategories(res.data);
      })
      .catch((err) => Alert.alert('서버 점검 중입니다.'));
  }, []);
  const isAnd = Platform.OS === 'android';
  const Wrapper =
    Platform.OS === 'android' ? KeyboardAwareScrollView : SafeAreaView;
  return (
    <Wrapper style={container}>
      <View style={title}>
        <SearchInput
          placeholder="검색어를 두 글자 이상 입력해주세요."
          placeholderTextColor={theme.text}
          value={search}
          onChangeText={setSearch}
        />
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={scroll}
        >
          {Categories.map(({ name }, idx) => (
            <Button
              style={button}
              color={idx === categoryIdx ? 'primary' : 'ghost'}
              content={name}
              key={idx}
              headings={2}
              onPress={selectCategory(idx)}
            />
          ))}
        </ScrollView>
      </View>
      <Category search={search} {...Categories[categoryIdx]} />
    </Wrapper>
  );
}

export default MarketMain;
