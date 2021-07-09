import React, { useState } from 'react'
import { FlatList, StyleSheet } from 'react-native'
import { DefaultTheme } from '@style/styled'
import Daily from './Daily'
import useTheme from '@/modules/theme/hooks'
import useDailyList from '@/modules/userDailyList/hooks'

function DailyList() {
  const theme = useTheme();
  const { dailys } = useDailyList();
  const [contentSize, setContentSize] = useState<number>(0)
  const getData = async (props: any) => {

  }
  const renderItem = ({index, item}: any) => (
      <Daily
        index={index}
        daily={item}
      />
  )

  return (
    <FlatList
      onScrollEndDrag={getData}
      onContentSizeChange={setContentSize}
      horizontal
      showsHorizontalScrollIndicator
      initialNumToRender={7}
      style={styles(theme).scroll}
      data={dailys}
      keyExtractor={(item) => item.date.format('YYYYMMDD')}
      renderItem={renderItem}
      contentInset={{left: 400}}
    />
  )
}

const styles = (theme: DefaultTheme) => {
  const { mainBackground } = theme
  return StyleSheet.create({
    scroll: {
      flex: 1,
      padding: 5,
      paddingLeft: 15,
      paddingVertical: 10,
      backgroundColor: mainBackground,
    },
  })
}

export default DailyList
