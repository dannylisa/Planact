import React, { useState } from "react";
import { Entypo, Ionicons } from '@expo/vector-icons'
import { Alert, Platform, TouchableOpacity, View } from "react-native";
import { StyleSheet } from "react-native";
import { ProofProps } from ".";
import { SpecificColors } from "@/modules/theme/hooks";
import * as ImagePicker from 'expo-image-picker';

const styles = StyleSheet.create({
    container:{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    checkmark:{
        position: "absolute",
        right: -10, 
        top: -5,
        fontWeight: "900"
    }
})

export default function({userschedule_id, userevent_id, updateProof, proof}:ProofProps){
    const update = async (photo: string) => {
        if(!photo) 
            return;
        await updateProof({
            userschedule_id,
            userevent_id,
            proof:1,
            prev_proof: proof,
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

    const { container, checkmark } = styles;

    const {blue, red} = SpecificColors;
    return (
        <View >
            {
                <TouchableOpacity onPress={onPress} style={container}>
                    {proof ?
                        <>
                            <Ionicons name="ios-camera-outline" size={26} color={blue} />
                            <Entypo
                                style={styles.checkmark}
                                name="check" 
                                size={16} 
                                color={blue} 
                            />                       
                        </>
                        :
                        <Ionicons name="ios-camera-outline" size={26} color={red} />
                    }
                </TouchableOpacity>
            }
        </View>
    )
}

