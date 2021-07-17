import React, { useState } from 'react';
import {
  FlatList,
  NativeScrollEvent,
  NativeSyntheticEvent,
  StyleSheet,
} from 'react-native';
import { DefaultTheme } from '@style/styled';
import Daily from './Daily';
import useTheme from '@/modules/theme/hooks';
import { useDailyList } from '@/modules/userDailyList/hooks';
import { useEffect } from 'react';
import dayjs from 'dayjs';

const defaultFetched = {
  start: dayjs().add(-7, 'days'),
  end: dayjs().add(24, 'days'),
};

function DailyList() {
  const theme = useTheme();
  const { start, end, dailys, setSelectedDaily, previousFetch, nextFetch } =
    useDailyList();
  const [loading, setLoading] = useState<boolean>(false);
  const flatListRef = React.useRef<FlatList>(null);

  const toTop = () => {
    // use current
    flatListRef.current?.scrollToOffset({ animated: true, offset: 956 });
  };

  useEffect(() => {
    if (
      defaultFetched.start.diff(start, 'days') === 0 &&
      defaultFetched.end.diff(end, 'days') === 0
    )
      toTop();
  }, [start, end]);

  const getData = async (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    if (loading) return;
    const x = event.nativeEvent.contentOffset.x;
    if (x === 0) {
      setLoading(true);
      await previousFetch().then(() => setLoading(false));
    }
  };
  const onEndReached = async () => {
    if (loading) return;
    setLoading(true);
    await nextFetch().then(() => setLoading(false));
  };

  const onPress = (index: number) => () => setSelectedDaily(index);
  const renderItem = ({ index, item }: any) => (
    <Daily index={index} daily={item} onPress={onPress(index)} />
  );

  return (
    <FlatList
      ref={flatListRef}
      horizontal
      showsHorizontalScrollIndicator
      initialNumToRender={21}
      onScroll={getData}
      onEndReached={onEndReached}
      onEndReachedThreshold={1}
      style={styles(theme).scroll}
      data={dailys}
      keyExtractor={(item) => item.date.format('YYYYMMDD')}
      renderItem={renderItem}
      refreshing={loading}
    />
  );
}

const styles = (theme: DefaultTheme) => {
  const { mainBackground } = theme;
  return StyleSheet.create({
    scroll: {
      flex: 1,
      padding: 5,
      paddingLeft: 15,
      paddingTop: 15,
      backgroundColor: mainBackground,
    },
  });
};

export default DailyList;
