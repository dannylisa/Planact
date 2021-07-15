import useTheme, { SpecificColors } from "@/modules/theme/hooks"
import { DefaultTheme } from "@/style/styled";
import React, { useMemo, useState } from "react"
import { StyleSheet, TouchableOpacity, View } from "react-native"
import { Text, Number } from "@components/materials";
import { AntDesign, FontAwesome } from "@expo/vector-icons";

export interface CommentProps {
    username: string
    content: string
    user_likes: boolean
    count_likes: number
}

export default function Comment({username, content, user_likes, count_likes}: CommentProps){
    const theme = useTheme();
    const {container, likeContainer} = useMemo(() => styles(theme), [theme])
    const {red} = SpecificColors;
    const [likes, setLikes] = useState<Boolean>(user_likes);
    const toggleLike = () => {
        setLikes(prev => !prev)
    }

    return (
        <View style={container}>
            <View>
                <Text 
                    align="left"
                    bold
                    content={username}
                    flex={1}
                    marginBottom={8}
                    headings={2}
                />
                <Text 
                    align="left" 
                    content={content}
                    flex={1}
                    marginBottom={5}
                    headings={2}
                />
            </View>
            <View style={likeContainer}>
                <TouchableOpacity onPress={toggleLike}>
                    <FontAwesome
                        name={likes ? "heart" : "heart-o"}
                        size={25} 
                        color={red}
                    />
                </TouchableOpacity>
                <Number
                    headings={2}
                    value={
                        user_likes ?
                        (likes ? count_likes : count_likes-1)
                        : (likes ? count_likes : count_likes+1)
                    } 
                    marginHorizontal={8}
                />
            </View>
        </View>
    )
}

const styles = (theme:DefaultTheme) => {
    return StyleSheet.create({
        container:{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            paddingLeft: 16,
            marginTop: 14,
            minHeight: 60
        },
        likeContainer:{
            flexDirection: "row",
            paddingHorizontal: 10
        }
    })
}