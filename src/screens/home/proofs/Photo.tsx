import React, { useState } from "react";
import { Ionicons } from '@expo/vector-icons'
import { Alert, Platform, TouchableOpacity, View } from "react-native";
import { StyleSheet } from "react-native";
import { ProofProps } from ".";
import { SpecificColors } from "@/modules/theme/hooks";
import * as ImagePicker from 'expo-image-picker';

const style = StyleSheet.create({
    container:{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    }
})
export default function({userevent_id, updateProof, proof}:ProofProps){

    const update = async (photo: string) => {
        if(!photo) 
            return;
        await updateProof({
            userevent_id,
            proof:1,
            photo
        }).then((res) => null)
        .catch((err) => Alert.alert("오류입니다."))
    }

    const getImage = async () => {
        if (Platform.OS !== 'web') {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
              alert('카메라 앱에 대한 접근이 허용되지 않았습니다.');
              return;
            }
        }

        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
          });
      
          if (!result.cancelled) 
            update(result.uri)
    }

    const onPress = async() => {
        if(!proof) 
            Alert.alert("계획 완료 사진을 업로드 하시겠습니까?",'',[
                { text: '취소', style: 'cancel'},  
                {text: '예', onPress: getImage},
            ])
        else
            Alert.alert("인증 사진을 이미 업로드 하셨습니다!")
        
    }

    const { container } = style;

    const {blue, red} = SpecificColors;
    return (
        <View style={container}>
            {
                proof ?
                <TouchableOpacity onPress={onPress} style={{flexDirection: "row"}}>
                    <Ionicons name="ios-camera-outline" size={26} color={blue} />
                    <Ionicons name="checkmark-outline" size={26} color={blue} />
                </TouchableOpacity>
                :
                <TouchableOpacity onPress={onPress}>
                    <Ionicons name="ios-camera-outline" size={26} color={red} />
                </TouchableOpacity>
            }
        </View>
    )
}

