import { InputView } from "@/components/Input";
import { TouchableView } from "@/components/TouchableView";
import { GlobalState } from "@/modules";
import { DefaultTheme } from "@/style/styled";
import React, { useState } from "react";
import { Alert, TextInput } from "react-native";
import { Modal, StyleSheet, View, Text,SafeAreaView } from "react-native";
import { useSelector } from "react-redux";
import { AntDesign } from '@expo/vector-icons';
import { programs_dummy } from "@/db/market/MarketPrograms";
import { Image } from "react-native";
import PlanSearch from "./PlanSearch";
interface MarketProps {

}
function Market({}:MarketProps){
    const theme = useSelector(({theme}:GlobalState) => theme)
    const {img, item, body, search, input} = styles(theme);
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
                <PlanSearch/>
                <InputView/>
                <TouchableView onPress={ModalOpen}>
                  <AntDesign name="filter" size={24} color="black" />
                </TouchableView>
            </View>
            <View>
              {/* 데이터는 AXIOS로 받아올 것이기 때문에 비동기 함수로 데이터를 받아올 것임.
                따라서 programs 데이터는 useState<IPrograms[]>([]) 활용해서 State로 선언해야 하고,
                useEffect 활용해서 데이터 받아올 것. 데이터 받아오는 동안은 로딩 화면이 나타나야 하니
                loading이라는 state 선언해서 데이터 받아오는 동안에는 로딩 화면 나타날 수 있도록.
              */}
                {programs_dummy.map((plan, idx)=> (
                  <View style={item} key={idx}>
                    <Image 
                      // source={require(`${plan.photoUrl}`)}
                      style={img}
                      source={require('../../assets/img/health.jpg')}
                    />
                    <View>
                      <Text>{plan.program_name}</Text>
                      <Text>{plan.description}</Text>
                      {/* 이거 어떻게 처리하지 */}
                    </View>
                  </View>
                ))}
                {/* <FlatList
                  data={programs_dummy.plans}
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
        input:{
          flex:1
        },
        item:{
          borderWidth: 1,
          borderColor: 'black',
          marginBottom: 10,
          display:'flex',
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

