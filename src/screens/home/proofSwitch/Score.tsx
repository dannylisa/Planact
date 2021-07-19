import { AntDesign } from "@expo/vector-icons";
import React from "react";
import { Alert, TouchableOpacity } from "react-native";
import { Number } from "@components/materials";
import { ProofProps } from ".";
import { SpecificColors } from "@/modules/theme/hooks";
import dayjs from "dayjs";
import { useDailyList } from "@/modules/userDailyList/hooks";

export default function ({userschedule_id, userevent_id, updateProof, proof, title}:ProofProps) {
    const { getSelectedDaily } = useDailyList();
    
    const onPress = () => {
        const diff = dayjs().diff(getSelectedDaily().date, 'days')
        if(diff>2){
            Alert.alert("이틀이 지난 일정은 체크할 수 없습니다.")
            return Promise.resolve(false)
        }
        else if(diff<0){
            Alert.alert("일정이 진행된 후에 체크해주세요!")
            return Promise.resolve(false)
        }
        
        Alert.prompt(title, '숫자만 입력해 주세요.',[  
            { text: '취소', style: 'cancel'},  
            {
                text: '입력', 
                onPress: (value?:string) => {
                    if( !value || isNaN(+value))
                        onPress();
                    else{
                        updateProof({
                            userschedule_id,
                            userevent_id,
                            proof: +value,
                            prev_proof: proof,
                        })
                        Alert.alert('입력되었습니다.')
                    }
                }
            },  
        ])
    }
    const {red, blue} = SpecificColors;
            return  (
        <TouchableOpacity onPress={onPress}>
            {
            proof === null ?
                <AntDesign name="exclamationcircleo" size={24} color={red} />
                :
                <Number headings={1} value={proof} style={{color: (proof || 0) ? blue : red}}/>
            }
        </TouchableOpacity>
    )
}