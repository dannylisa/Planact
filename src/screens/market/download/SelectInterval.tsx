import { TextButton } from "@/components/materials";
import React from "react"
import { Picker, StyleSheet } from "react-native"
import { View } from "react-native"

interface SelectIntervalProps {
    visible: boolean
    value: number
    onValueChange: (itemValue: number) => void
    hide: () => void
}
const Days = Array(9).fill(0).map((_,i) => i+2);
export default function({visible, value, hide, onValueChange}:SelectIntervalProps){
    const { wrapper, container } = styles;
    return(
        <View style={[wrapper, {display: visible ?  "flex": "none"}]}>
            <View style={container}>
            <TextButton
                color="#5796fa" 
                content="완료" 
                onPress={hide}
                />
            </View>
            <Picker selectedValue={value} onValueChange={onValueChange}>
                {
                    Days.map((value) => (
                        <Picker.Item 
                            label={value+"일"} 
                            value={value} 
                            key={value} 
                        />
                    ))
                }
            </Picker>
        </View>
    )
}
const styles = StyleSheet.create({
    wrapper:{
        position: "absolute",
        width: "100%",
        bottom: 0,
        backgroundColor: "#fafafa",
    },
    container:{
        flexDirection: "row",
        justifyContent: "flex-end",
        alignItems: "center",
        paddingHorizontal: 12,
        paddingVertical: 6
    },
})