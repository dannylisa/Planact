import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { DefaultTheme } from "@/style/styled";
import { useSelector } from "react-redux";
import { GlobalState } from "@/modules";

interface ProfileProps {

}

function Profile({}:ProfileProps){
    const theme = useSelector(({theme}:GlobalState) => theme);
    const { wrapper } = styles(theme);
    return (
        <View style={wrapper}>
            <Text>
                Profile
            </Text>
        </View>
    )
}


const styles = (theme:DefaultTheme) => {
    const {mainBackground} = theme;
    return StyleSheet.create({
        wrapper:{
            backgroundColor: mainBackground,
            flex: 1
        }
    })
}

export default Profile