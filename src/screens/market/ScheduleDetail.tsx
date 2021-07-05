import { GlobalState } from '@/modules'
import { DefaultTheme } from '@/style/styled'
import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { useSelector } from 'react-redux'
import Modal from 'react-native-modal'
import { SafeAreaView } from 'react-navigation'
interface ScheduleDetailProps {
  isVisible: boolean
  onPress
}

function ScheduleDetail({ isVisible }: ScheduleDetailProps) {
  const { theme } = useSelector((state: GlobalState) => state)
  const { container, modalContent } = styles(theme)

  return (
    <SafeAreaView style={container}>
      <Modal isVisible={true} style={container}>
        <View style={modalContent}>
          <Text>I am the modal!</Text>
          <Image source={require('@/assets/icons/leg.png')} />
        </View>
      </Modal>
    </SafeAreaView>
  )
}

const styles = (theme: DefaultTheme) => {
  const { content, text, mainBackground } = theme
  return StyleSheet.create({
    container: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    modalContent: {
      width: 300,
      backgroundColor: mainBackground,
      height: 500,
    },
  })
}

export default ScheduleDetail
