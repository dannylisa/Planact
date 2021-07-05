import { DefaultText } from '@/components/DefaultText'
import { TouchableView } from '@/components/TouchableView'
import { GlobalState } from '@/modules'
import { shadow } from '@/style/style-util'
import { DefaultTheme } from '@/style/styled'
import { isLight } from '@/style/themes'
import { ISchedule } from '@/utils/data'
import React, { useState } from 'react'
import { Image, StyleSheet, Text } from 'react-native'
import { FlatList, View } from 'react-native'
import { useSelector } from 'react-redux'
import ScheduleDetail from './ScheduleDetail'
import Modal from 'react-native-modal'
import { AntDesign } from '@expo/vector-icons'
interface ProgramProps {
  data: ISchedule[]
  isLoading: Boolean
}

function Program({ data, isLoading }: ProgramProps) {
  const [modal, setModal] = useState(false)
  const [modalData, setModalData] = useState({})
  const modalOpen = () => {
    setModal((prev) => !prev)
  }

  //스타일 설정
  const theme = useSelector(({ theme }: GlobalState) => theme)
  const {
    programStyle,
    body,
    costText,
    container,
    modalImage,
    planSummary,
    planSetting,
    modalContent,
    closeButton,
  } = styles(theme)

  //flatlist renderItem 함수
  const renderPrograms = ({ item }) => {
    if (isLoading) return <Text>loading...</Text>
    //prettier-ignore
    const onPress = (id:string) => () => {
      
      
  }
    return (
      <TouchableView onPress={modalOpen} viewStyle={programStyle}>
        <DefaultText text={item.name} />
        <DefaultText text={item.category} />
        <DefaultText text={`가격 : ${item.price}`} textStyle={costText} />

        {/* <Schedule
          visible={modalVisible}
          transparent={true}
          programId={item.program_id}
          setModalVisible={setModalVisible}
          programName={item.program_name}
          programDetail={item.description}
          thumbnail={item.thumbnail}
          price={item.price}
        /> */}
      </TouchableView>
    )
  }
  return (
    <>
      <FlatList
        data={data}
        renderItem={renderPrograms}
        keyExtractor={(item) => item.id}
        style={body}
      />
      {/* <ScheduleDetail isVisible={modal} onPress={modalOpen} /> */}
      <Modal isVisible={modal} style={container}>
        <View style={modalContent}>
          <View style={planSummary}>
            <Image
              source={require('@/assets/icons/leg.png')}
              style={modalImage}
            />
            <View>
              <Text>Title</Text>
              <Text>Description</Text>
            </View>
          </View>
          <View style={planSetting}>
            <Text>hello</Text>
          </View>
          <TouchableView onPress={modalOpen} style={closeButton}>
            <AntDesign name="close" size={24} color="black" />
          </TouchableView>
        </View>
      </Modal>
    </>
  )
}

const styles = (theme: DefaultTheme) => {
  const { content, text, mainBackground } = theme
  const shadowOption = isLight(theme) ? shadow : {}
  return StyleSheet.create({
    body: {
      padding: 5,
    },
    programStyle: {
      backgroundColor: content,
      height: 100,
      marginBottom: 10,
      padding: 5,
      borderRadius: 17,
      justifyContent: 'space-between',
      ...shadowOption,
    },
    costText: {
      fontSize: 10,
      alignSelf: 'flex-end',
    },
    container: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    modalContent: {
      width: 300,
      backgroundColor: mainBackground,
      height: 500,
      borderRadius: 15,
      padding: 15,
    },
    modalImage: {
      width: 50,
      height: 50,
    },
    planSummary: {
      flexDirection: 'row',
      margin: 10,
    },
    planSetting: {
      margin: 10,
      flex: 1,
    },
    closeButton: {
      position: 'absolute',
      right: 10,
      top: 10,
    },
  })
}

export default Program
