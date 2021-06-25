import { GlobalState } from '@/modules';
import { DefaultTheme } from '@/style/styled';
import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { TextInput } from 'react-native';
import { StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';

interface PlanSearchProps {

} 

function PlanSearch (){
  const {theme, userSchedules} = useSelector((state:GlobalState) => state);
  const {container, input} = styles(theme);
  const [text, onChangeText] = useState("");
  return(
    <View style={container}>
      <TextInput
        style={input}
        onChangeText={onChangeText}
        placeholder = "검색어를 입력하세요"
      />
    </View>
  )
}

const styles = (theme:DefaultTheme) => {
  return StyleSheet.create({
      container:{
        height: '200',
        backgroundColor: 'red'
      },
      input:{
        flex: 1
      }

  })
}

export default PlanSearch