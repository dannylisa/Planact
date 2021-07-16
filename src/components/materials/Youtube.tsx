import React from "react"
import { WebView } from 'react-native-webview';
import { StyleSheet, View } from "react-native";


interface YoutubeProps {
    vid: string
    t?: number | string
}

export default function Youtube({vid, t}:YoutubeProps){
    const Base_Uri = `https://www.youtube.com/embed/${vid}?controls=1&disablekb=1&egm=1&rel=0`
    const uri = t ? Base_Uri : `${Base_Uri}&t=${t}`;
    return(
        <View style={styles.container}>
            <WebView 
                mixedContentMode='always' 
                source={{ uri }} 
                useWebKit={true} // ios 필수 
                scrollEnabled={false} 
                domStorageEnabled={true} 
                javaScriptEnabled={true} 
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        aspectRatio: 16/10
    }
})