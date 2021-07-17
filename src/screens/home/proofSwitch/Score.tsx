import { AntDesign } from "@expo/vector-icons";
import React from "react";
import { Alert, TouchableOpacity } from "react-native";
import { Number } from "@components/materials";
import { ProofProps } from ".";
import { SpecificColors } from "@/modules/theme/hooks";

export default function ({userschedule_id, userevent_id, updateProof, proof, title}:ProofProps) {
    const onPress = () => Alert.prompt(title, '숫자만 입력해 주세요.',[  
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
        ],
    )
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