import { TouchableView } from '@/components/TouchableView'
import { getMarketSchedules } from '@/db/market/MarketSchedules'
import { GlobalState } from '@/modules'
import { DefaultTheme } from '@/style/styled'
import { ISchedule } from '@/utils/data'
import React, { ComponentProps, useState } from 'react'
import { useEffect } from 'react'
import { Modal, View, Text, StyleSheet } from 'react-native'
import { useSelector } from 'react-redux'

type ModalProps = ComponentProps<typeof Modal>

interface ScheduleProps extends ModalProps {
  programId: string
  setModalVisible
}
//prettier-ignore
function Schedule({ programId , setModalVisible, ...modalProps
}: ScheduleProps) {
  
  const { theme } = useSelector((state: GlobalState) => state)
  const { container } = styles(theme)
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
  return (
    <Modal {...modalProps}>
       <View style={container}>
        <View>
          <Text>Hello</Text>
          <TouchableView onPress={onPress}>
            <Text>close</Text>
          </TouchableView>
        </View>
      </View>
    </Modal>
  )
}

export default Schedule

const styles = (theme: DefaultTheme) => {
  const { text, content, mainBackground } = theme
  return StyleSheet.create({
    container: {
      backgroundColor: 'rgba(0,0,0,.3)',
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
  })
}
