import React, { useCallback, useEffect, useMemo, useState } from 'react';
import useTheme from '@/modules/theme/hooks';
import { DefaultTheme } from '@/style/styled';
import { FlatList, SafeAreaView, StyleSheet, View } from 'react-native';
import { SearchInput, Text } from '@components/materials';
import { getMarketSchedulesByCategory } from '@/api/market/';
import { AxiosError, AxiosResponse } from 'axios';
import { ISchedule } from '@/utils/data';
import { useUserState } from '@/modules/auth/hooks';
import ScheduleListItem from './ScheduleListItem';

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
    listItemWrapper: {
      flex: 5,
      paddingHorizontal: 20,
      justifyContent: 'flex-start',
      backgroundColor: theme.mainBackground,
    },
  });
};

function MarketMain({ navigation }) {
  const theme = useTheme();
  const { getToken } = useUserState();
  const { container, title, listItemWrapper } = useMemo(() => {
    return styles(theme);
  }, [theme]);
  const [schedules, setSchedules] = useState<ISchedule[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const token = await getToken();
      if (!token) return;

      //Fetch Programs
      await getMarketSchedulesByCategory(token, 'all')
        .then((res: AxiosResponse<ISchedule[]>) => setSchedules(res.data))
        .catch((err: AxiosError) => {
          console.log(err.response);
        });
      setIsLoading(false);
    })();
  }, []);

  const onItemPressed = (item: ISchedule) => () =>
    navigation.push('Market/Schedule/Details', { schedule: item });
  const renderItem = ({ item }: { item: ISchedule }) => {
    return <ScheduleListItem onPress={onItemPressed(item)} schedule={item} />;
  };

  return (
    <SafeAreaView style={container}>
      <View style={title}>
        <SearchInput
          placeholder="검색어를 입력해주세요."
          placeholderTextColor={theme.text}
        />
      </View>
      <FlatList
        data={schedules}
        renderItem={renderItem}
        keyExtractor={useCallback(
          (item: ISchedule, index: number) => '' + index,
          []
        )}
        contentContainerStyle={listItemWrapper}
      />
    </SafeAreaView>
  );
}

export default MarketMain;
