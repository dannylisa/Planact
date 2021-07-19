import React, { useMemo } from "react"
import { Text, Youtube } from "@components/materials";
import { StyleSheet, View } from "react-native";
import { DefaultTheme } from "@/style/styled";
import useTheme from "@/modules/theme/hooks";
import { YoutubeProps } from "@/components/materials/Youtube";
import Post from "./Post";

interface ContentParserProps {
    content: string
}

interface ParseProps {
    title?: string
    content?: string
    youtube?: YoutubeProps
    posts?: PostProps[]
}

export interface PostProps {
    header?: string
    content?: string
    uri?: string
}

export default function({content}:ContentParserProps){
    const theme = useTheme();
    const {wrapper} = useMemo(() => styles(theme), [theme])
    const fin = content.indexOf("%%", 2)
    if( !(~content.indexOf("%%") && ~ fin ))
        return (
            <View style={wrapper}>
                <Text align="left" content={content} />
            </View>
        )
    
    
    try {

        const parsed = JSON.parse(content.slice(2, fin)) as ParseProps;
        return (
            <View style={wrapper}>
                {parsed.title ?
                    <Text
                        align="left"
                        bold
                        headings={1}
                        content={parsed.title} 
                        marginBottom={12}
                    /> : <></>
                }
                {
                    parsed.youtube ?
                        <Youtube {...parsed.youtube}/>
                    :<></>
                }
                {parsed.posts?
                    parsed.posts.map((post, idx) => (
                        <Post {...post} key={idx} />
                    )):<></>
                }
            </View>
        )
    }
    catch(error){
        return <Text content="" />
    }
}

const styles = (theme:DefaultTheme) => {
    return StyleSheet.create({
        wrapper:{
            paddingVertical: 8,
            paddingHorizontal: 15
        }
    })
}