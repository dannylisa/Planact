import React, { useMemo, useCallback } from 'react'
import { Text } from '@components/materials';
import { DefaultTheme } from '@/style/styled'
import { FlatList, SafeAreaView, TouchableOpacity } from 'react-native'
import { StyleSheet, View } from 'react-native'
import useTheme from '@/modules/theme/hooks'
import CategoryBox from './CategoryBox';

const categories = [
  { category: '헬스', iconName: 'fitness-center' },
  { category: '학습', iconName: 'menu-book' },
  { category: '투자', iconName: 'attach-money' },
  { category: '여행', iconName: 'wallet-travel' },
  { category: '코딩', iconName: 'code' },
  { category: '음악', iconName: 'queue-music' },
]

function MarketMain({ navigation }) {
  const theme = useTheme()
  const { container, header, listStyle } = useMemo(() => styles(theme),[theme])
  const onPress = useCallback((category) => () => navigation.push("Market/Category", {category}),[])
  
  const renderCateories = ({ item:{category, iconName} }) => {
    return (
      <CategoryBox category={category} icon={iconName} onPress={onPress(category)}/>
    )
  }

  return (
    <SafeAreaView style={container}>
      <View style={header}>
        <Text content="hello"/>
      </View>
      <FlatList
        style={listStyle}
        data={categories}
        renderItem={renderCateories}
        numColumns={2}
        keyExtractor={(item, index) => ""+index}
        contentContainerStyle={{
          justifyContent: 'space-evenly',
          alignItems: 'center',
        }}
      />
    </SafeAreaView>
  )
}

const styles = (theme: DefaultTheme) => {
  const { mainBackground } = theme
  return StyleSheet.create({
    container: { flex: 1, backgroundColor: mainBackground },
    header: {
      height: 40,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    listStyle: {
      padding: 20,
      display: 'flex',
      backgroundColor: mainBackground
    },
  })
}

export default MarketMain
