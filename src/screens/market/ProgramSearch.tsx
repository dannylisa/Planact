import { InputView } from '@/components/Input'
import { TouchableView } from '@/components/TouchableView'
import { GlobalState } from '@/modules'
import { DefaultTheme } from '@/style/styled'
import React, { useState } from 'react'
import { Text, View } from 'react-native'
import { TextInput } from 'react-native'
import { StyleSheet } from 'react-native'
import { useSelector } from 'react-redux'
import { AntDesign } from '@expo/vector-icons'
interface PlanSearchProps {}

function ProgramSearch({}: PlanSearchProps) {
  const { theme, userSchedules } = useSelector((state: GlobalState) => state)
  const { searchForm, search, input } = styles(theme)
  const [dropdownVisible, setdropdownVisible] = useState(false)
  const dropDownOpen = () => {
    setdropdownVisible((prev) => !prev)
  }
  return (
    <View style={search}>
      <View style={searchForm}>
        <InputView />
        <TouchableView onPress={dropDownOpen}>
          <AntDesign name="filter" size={24} color={theme.text} />
        </TouchableView>
      </View>
      {dropdownVisible && (
        <View>
          <Text>Dropdown</Text>
        </View>
      )}
    </View>
  )
}

const styles = (theme: DefaultTheme) => {
  return StyleSheet.create({
    search: {
      backgroundColor: theme.mainBackground,
      height: 50,
      marginBottom: 10,
    },
    searchForm: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
    },
    input: {
      flex: 1,
    },
  })
}

export default ProgramSearch
