import React from "react"
import { Text } from "@components/materials";
import { View } from "react-native";

interface ContentParserProps {
    content: string
}
export default function({content}:ContentParserProps){
    return (
        <View style={{backgroundColor: "#ffcccc", height: 250}}>
            <Text content={content} />
        </View>
    )
}