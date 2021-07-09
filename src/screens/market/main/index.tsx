import React from 'react'
import { Text } from '@components/materials';
import { DefaultTheme } from '@/style/styled'
import { FlatList, SafeAreaView, TouchableOpacity } from 'react-native'
import { StyleSheet, View } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import { NavigationStackProp } from 'react-navigation-stack'
import useTheme from '@/modules/theme/hooks'
import { useMemo, useCallback  } from 'react'
import { shadow } from '@/style/style-util'

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
  const { container, itemStyle, header, listStyle } = useMemo(() => styles(theme),[])
  const onPress = useCallback((category) => () => navigation.push("Market/Category", {category}),[])
  
  const renderPrograms = ({ item }) => {
    console.log(item);
    return (
      <View style={itemStyle}>
        <TouchableOpacity onPress={onPress(item.category)}>
          <MaterialIcons name={item.iconName} size={48} color="black" />
          <Text content={item.title} />
        </TouchableOpacity>
      </View>
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
        renderItem={renderPrograms}
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
  const { content, text, mainBackground } = theme
  return StyleSheet.create({
    container: { flex: 1, backgroundColor: content },
    header: {
      height: 40,
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
      ...shadow
    },
    listStyle: {
      padding: 20,
      display: 'flex',
    },
  })
}

export default MarketMain
