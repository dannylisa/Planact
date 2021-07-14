import useTheme from "@/modules/theme/hooks"
import { DefaultTheme } from "@/style/styled"
import React from "react"
import { StyleSheet, SafeAreaView, View } from "react-native"

export default function (){
    const theme = useTheme()
    const { container, alias } = styles(theme)
    
    return (
        <SafeAreaView style={container}>
            <View style={alias}>
            </View>

        </SafeAreaView>
    )
}

const styles = ({mainBackground}:DefaultTheme) => StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: mainBackground,
        padding:20
    },
    alias: {
        flexDirection: "row"
    }
})