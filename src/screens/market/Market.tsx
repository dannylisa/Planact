import Button from "@/components/Button";
import { InputView } from "@/components/Input";
import { TouchableView } from "@/components/TouchableView";
import { GlobalState } from "@/modules";
import { DefaultTheme } from "@/style/styled";
import React, { useState } from "react";
import { Alert, TextInput } from "react-native";
import { Modal, StyleSheet, View, Text,SafeAreaView } from "react-native";
import { useSelector } from "react-redux";
import { AntDesign } from '@expo/vector-icons';
import { plan_sample } from "@/db/PlanSamples";
import { Image } from "react-native";
import { FlatList } from "react-native";
interface MarketProps {

}

function Market({}:MarketProps){
    const theme = useSelector(({theme}:GlobalState) => theme)
    const {img, item,body,search, y,input} = styles(theme);
    const [text, onChangeText] = useState("");
    const [modalVisible, setModalVisible] = useState(false);

    

    const ModalOpen = () => {
      setModalVisible(prev => !prev)
    }

    return (
        <SafeAreaView style={body}>
            <Modal
              animationType="slide"
              transparent={true}
              visible={modalVisible}
              onRequestClose={()=>{
                Alert.alert("Modal has been closed.");
                ModalOpen()
              }}
            >
              <View style={{flex:1, backgroundColor:"rgba(0,0,0,.3)", alignItems:"center",justifyContent:"center"}}>
                <View style={{backgroundColor:'#fff', width:100,height:100,borderRadius:18,padding: 10}}>
                  <Text>Modal Test</Text>
                  <TouchableView onPress={ModalOpen}>
                    <Text>close</Text>
                    </TouchableView>
                </View>
              </View>
            </Modal>
            
            <View style={search}>
                {/* <PlanSearch/> */}
                <InputView/>
                <TouchableView onPress={ModalOpen}>
                  <AntDesign name="filter" size={24} color="black" />
                </TouchableView>
            </View>
            <View>
                {plan_sample.plans.map(plan=> (
                  <View style={item}>
                    <Image 
                      // source={require(`${plan.photoUrl}`)}
                      style={img}
                      source={require('../../assets/img/health.jpg')}
                    />
                    <View>
                      <Text>{plan.summary}</Text>
                      <Text>{plan.description}</Text>
                      {/* 이거 어떻게 처리하지 */}
                    </View>
                  </View>
                ))}
                {/* <FlatList
                  data={plan_sample.plans}
                  renderItem={})=>{

                  }
                /> */}
            </View>
        </SafeAreaView>
    )
}

const styles = (theme:DefaultTheme) => {
    return StyleSheet.create({
        body:{
          flex:1,
          backgroundColor: theme.mainBackground,
          padding: 5
        },
        search:{
          backgroundColor: theme.mainBackground,
          height: 50,
          flexDirection:'row',
          alignItems:'center',
          marginBottom:10,
        },
        y:{},
        input:{
          flex:1
        },
        item:{
          borderWidth: 1,
          borderColor: 'black',
          marginBottom: 10,
          display:'flex',
          // flexWrap:'wrap',
          flexDirection:'row',

        },
        itemText:{
          display:'flex',
          flexWrap:'wrap',
          
        },
        img:{
          height: 100,
          width: 100,
          marginRight: 10
        }

    })
}

export default Market;

