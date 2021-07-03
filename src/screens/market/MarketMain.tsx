import { GlobalState } from '@/modules'
import { DefaultTheme } from '@/style/styled'
import React from 'react'
import { FlatList, Text } from 'react-native'
import { StyleSheet, View } from 'react-native'
import { useSelector } from 'react-redux'
import MarketCategory from './MarketCategory'
import { MaterialIcons } from '@expo/vector-icons'
import { TouchableView } from '@/components/TouchableView'
const categories = [
  { title: '헬스', iconName: 'fitness-center' },
  { title: '학습', iconName: 'menu-book' },
  { title: '투자', iconName: 'attach-money' },
  { title: '여행', iconName: 'wallet-travel' },
  { title: '코딩', iconName: 'code' },
  { title: '음악', iconName: 'queue-music' },
]

interface MarketMainProps {
  navigation
}

function MarketMain({ navigation }: MarketMainProps) {
  const { theme } = useSelector((state: GlobalState) => state)
  const { container, itemStyle, header, listStyle } = styles(theme)
  const onPress = () => {
    navigation.push('MarketDetail')
  }
  const renderPrograms = ({ item }) => {
    return (
      <View style={itemStyle}>
        <TouchableView onPress={onPress}>
          <MaterialIcons name={item.iconName} size={24} color="black" />
          <Text>{item.title}</Text>
        </TouchableView>
      </View>
    )
  }
  return (
    <View style={container}>
      <View style={header}>
        <Text>hello</Text>
      </View>
      <FlatList
        style={listStyle}
        data={categories}
        renderItem={renderPrograms}
        numColumns={2}
        contentContainerStyle={{
          justifyContent: 'space-evenly',
          alignItems: 'center',
        }}
      />
    </View>
  )
}

const styles = (theme: DefaultTheme) => {
  const { content, text, mainBackground } = theme
  return StyleSheet.create({
    container: { flex: 1, backgroundColor: mainBackground },
    header: {
      height: 80,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    itemStyle: {
      width: 160,
      height: 160,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      margin: 10,
      backgroundColor: content,
      borderRadius: 12,
    },
    listStyle: {
      padding: 20,
      display: 'flex',
    },
  })
}

export default MarketMain
