import React, { useMemo } from "react"
import { Text, OpenUrlButton } from "@components/materials"
import { PostProps } from "./index"
import { Linking, StyleSheet, View } from "react-native"
import useTheme from "@/modules/theme/hooks";
import { DefaultTheme } from "@/style/styled";
import { title } from "process";

export default function ({header, content, uri}:PostProps){
    const theme = useTheme();
    const {wrapper, title} = useMemo(() => styles(theme), [theme])
    
    return (
        <View style={wrapper}>
            <View style={title}>
                {header ?
                    <Text 
                        bold
                        align="left"
                        headings={1}
                        content={header}
                        marginRight={8}
                    /> : <></>
                }
            {
                uri && Linking.canOpenURL(uri) ? 
                    <OpenUrlButton url={uri} size={20} style={{marginBottom: 2}} />
                    : <></>
            }
            </View>
            {
                content ?
                <Text
                    align="left"
                    content={content} 
                    marginBottom={10}
                /> : <></>
            }
        </View>
    )
}

const styles = (theme:DefaultTheme) => {
    return StyleSheet.create({
        wrapper:{
            paddingHorizontal: 10,
            marginBottom:12
        },
        title:{
            flexDirection:"row",
            alignItems:"flex-end",
            marginBottom:8
        }
    })
}