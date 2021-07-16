import { Entypo, Foundation, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import { ProofProps } from ".";
import { SpecificColors } from "@/modules/theme/hooks";
import { useNavigation } from "@react-navigation/native";

const styles = StyleSheet.create({
    container:{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    checkmark:{
        position: "absolute",
        right: 10, 
        top: -5,
        fontWeight: "900"
    }
})

export default function ({userevent_id, proof}:ProofProps) {
    const navigation = useNavigation();
    const toDetails = () => navigation.navigate('Event/Details', {userevent_id});

 
    const {red, blue} = SpecificColors;
    return  (
        <TouchableOpacity
            style={styles.container}
            onPress={toDetails}
        >
            {
            proof === null ?
                <Entypo name="pencil" size={28} color={red} />
                :
                <>
                    <Foundation name="pencil" size={28} color={blue} />
                    <Entypo
                        style={styles.checkmark}
                        name="check" 
                        size={16} 
                        color={blue} 
                    />
                </>
            }
        </TouchableOpacity>
    )
}