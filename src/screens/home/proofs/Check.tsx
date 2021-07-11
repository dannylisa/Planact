import React from "react";
import { Octicons, Fontisto } from '@expo/vector-icons'
import { TouchableOpacity } from "react-native";
import { StyleSheet } from "react-native";

interface BooleanProofProps {
    proof: boolean | null
}
const style = StyleSheet.create({
    container:{
        flexDirection: "row",
        alignItems: "center"
    },
    ok: {
        color: "#23bd0f",
        marginRight: 15
    },
    not: {
        color: "#ca1a1a"
    },
})
export default function({proof}:BooleanProofProps){
    const { container, ok, not } = style;
    return (
        <TouchableOpacity style={container}>
            { proof !== false ?
                <Octicons style={ok} name="check" size={32} /> : <></>
            }
            { proof !== true ?
                <Fontisto style={not} name="close-a" size={20} /> : <></>
            }
            
        </TouchableOpacity>
    )
}

