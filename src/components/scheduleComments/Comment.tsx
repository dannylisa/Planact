import useTheme, { SpecificColors } from "@/modules/theme/hooks"
import { DefaultTheme } from "@/style/styled";
import React, { useMemo, useState } from "react"
import { StyleSheet, TouchableOpacity, View } from "react-native"
import { Text, Number } from "@components/materials";
import { FontAwesome } from "@expo/vector-icons";
import { IScheduleComment } from "@/utils/data";
import { toggleScheduleCommentLike } from "@/api/market";
import { useUserState } from "@/modules/auth/hooks";

interface CommentProps{
    comment: IScheduleComment
    count_events:number
}
export default function Comment({comment, count_events}: CommentProps){
    const {id, nickname, content, user_likes, count_likes, user_achievement} = comment;
    const theme = useTheme();
    const {container, rowContainer} = useMemo(() => styles(theme), [theme])
    const {red} = SpecificColors;
    const [likes, setLikes] = useState<Boolean>(user_likes);
    const {getToken} = useUserState();

    const toggleLike = async () => {
        const token = await getToken();
        if(token)
            toggleScheduleCommentLike(token, id);
        setLikes(prev => !prev)
    }

    return (
        <View style={container}>
            <View>
                <View style={[rowContainer,{flex:1}]}>
                    <Text 
                        align="left"
                        bold
                        content={nickname}
                        headings={2}
                        />
                    <Text 
                        align="left"
                        marginHorizontal={10}
                        content={
                            Math.floor(10000*user_achievement/count_events)/100+"% 진행 중"
                        }
                        headings={4}
                        />
                </View>
                <Text 
                    align="left" 
                    content={content}
                    flex={1}
                    marginVertical={6}
                    headings={2}
                    />
            </View>
            <View style={rowContainer}>
                <TouchableOpacity onPress={toggleLike}>
                    <FontAwesome
                        name={likes ? "heart" : "heart-o"}
                        size={25} 
                        color={red}
                    />
                </TouchableOpacity>
                <Number
                    headings={2}
                    // count_likes + +Boolean(likes) - +Boolean(user_likes)
                    value={
                        user_likes ?
                        (likes ? count_likes : count_likes-1)
                        : (likes ? count_likes+1 : count_likes)
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
        rowContainer:{
            flexDirection: "row",
            justifyContent:"flex-end",
            paddingRight: 10
        }
    })
}