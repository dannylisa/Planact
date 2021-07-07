import { DefaultText } from '@/components/DefaultText'
import { TouchableView } from '@/components/TouchableView'
import { getMarketSchedules } from '@/api/market/MarketSchedules'
import { GlobalState } from '@/modules'
import { DefaultTheme } from '@/style/styled'
import { ISchedule } from '@/utils/data'
import React, { ComponentProps, useState } from 'react'
import { useEffect } from 'react'
import { Image } from 'react-native'
import { Dimensions } from 'react-native'
import { Modal, View, Text, StyleSheet, FlatList } from 'react-native'
import { useSelector } from 'react-redux'
import { AntDesign } from '@expo/vector-icons'
type ModalProps = ComponentProps<typeof Modal>

interface ScheduleProps extends ModalProps {
  programId: string
  setModalVisible
  programName: string
  programDetail: string
  price: number
  thumbnail: string
}
//prettier-ignore
function Schedule({ programId ,thumbnail,programName,programDetail, price, setModalVisible, ...modalProps
}: ScheduleProps) {
  
  const { theme } = useSelector((state: GlobalState) => state)
  const { centerView,modalView ,thumbnailImage, programView, button} = styles(theme)
  const [schedules, setSchedules] = useState<ISchedule[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const onPress = () => {
    setModalVisible(false)
  }
  //prettier-ignore
  useEffect(() => {
    (async () => {
      //Fetch Programs
      const newSchedules: ISchedule[] = await getMarketSchedules(programId)
      setSchedules(newSchedules)
      setIsLoading(false)
    })()}
  ,[])
  const renderSchedules = ({item}) => {
    if(isLoading)return <DefaultText text={'loading...'}/>
    return(
      <DefaultText text={item.topic}/>
    )
  }
  return (
    <Modal {...modalProps}>
       <View style={centerView}>
        <View style={modalView}>
        <TouchableView style={button}onPress={onPress}>
        <AntDesign name="close" size={24} color={theme.text} />
      </TouchableView>
          <Image style={thumbnailImage}source={{uri: thumbnail}}/>
          <Text>{programName}</Text>
          <View style={programView}>
            <FlatList
              data={schedules}
              renderItem={renderSchedules}
              keyExtractor={(item)=> item.schedule_id}
            />
          </View>
        </View>
      </View>
      
    </Modal>
  )
}

export default Schedule

const styles = (theme: DefaultTheme) => {
  const { width, height } = Dimensions.get('window')
  const { text, content, mainBackground } = theme
  return StyleSheet.create({
    centerView: {
      backgroundColor: 'rgba(0,0,0,.3)',
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    modalView: {
      width: width,
      height: height,
      backgroundColor: content,
      borderRadius: 10,
      padding: 10,
      position: 'relative',
    },
    thumbnailImage: {
      width: '100%',
      height: 100,
      flex: 1,
    },
    programView: {
      borderTopWidth: 1,
      borderTopColor: 'rgba(0,0,0,.3)',
      flex: 2,
    },
    button: {
      position: 'absolute',
      right: 10,
      top: 25,
      zIndex: 10,
    },
  })
}
