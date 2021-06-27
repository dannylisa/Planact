import { AccentText, DetailText } from '@/components/DefaultText'
import { TouchableView } from '@/components/TouchableView'
import { GlobalState } from '@/modules'
import { DefaultTheme } from '@/style/styled'
import { IProgram } from '@/utils/data'
import React, { useState } from 'react'
import { StyleSheet, Text } from 'react-native'
import { FlatList, View } from 'react-native'
import { useSelector } from 'react-redux'
import Schedule from './Schedule'

interface ProgramProps {
  data: IProgram[]
  isLoading: Boolean
}

function Program({ data, isLoading }: ProgramProps) {
  const [modalVisible, setModalVisible] = useState(false)
  //스타일 설정
  const theme = useSelector(({ theme }: GlobalState) => theme)
  const { programStyle, body } = styles(theme)
  //flatlist renderItem 함수
  const renderPrograms = ({ item }) => {
    if (isLoading) return <Text>loading...</Text>
    //prettier-ignore
    const onPress = (id, e) => {
      console.log(id)
      setModalVisible(true)
  }
    return (
      <TouchableView
        onPress={(e) => {
          onPress(item.program_id, e)
        }}
        viewStyle={programStyle}
      >
        <AccentText text={item.program_name} />
        <DetailText text={item.description} />
        <Text>가격 : {item.price}</Text>

        <Schedule
          visible={modalVisible}
          transparent={true}
          programId={item.program_id}
          setModalVisible={setModalVisible}
        />
      </TouchableView>
    )
  }
  return (
    <FlatList
      data={data}
      renderItem={renderPrograms}
      keyExtractor={(item) => item.program_id}
      style={body}
    />
  )
}

const styles = (theme: DefaultTheme) => {
  const { content, text, mainBackground } = theme
  return StyleSheet.create({
    body: {
      padding: 5,
    },
    programStyle: {
      backgroundColor: content,
      height: 100,
      marginBottom: 10,
    },
  })
}

export default Program
