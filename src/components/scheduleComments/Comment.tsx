import useTheme, { SpecificColors } from "@/modules/theme/hooks"
import { DefaultTheme } from "@/style/styled";
import React, { useMemo, useState } from "react"
import { StyleSheet, View } from "react-native"
import { Text, Number } from "@components/materials";
import { EvilIcons, FontAwesome } from "@expo/vector-icons";
import { IScheduleComment } from "@/utils/data";
import { toggleScheduleCommentLike } from "@/api/market";
import { useUserState } from "@/modules/auth/hooks";

interface CommentProps{
    comment: IScheduleComment
    count_events:number
    deleteComment: (comment_id:string) => void
}
export default function Comment({comment, count_events, deleteComment}: CommentProps){
    const {id, nickname, content, user_likes, count_likes, user_achievement} = comment;
    const {profile} = useUserState();
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

    const deleteIt = () => deleteComment(id)

    return (
        <View style={container}>
            <View style={{flex:4}}>
                <View style={[rowContainer,]}>
                    <Text 
                        align="left"
                        bold
                        content={nickname}
                        headings={2}
                        flex={1}
                        />
                    <Text 
                        align="left"
                        marginHorizontal={10}
                        content={
                            !user_achievement ?
                                " "
                            :
                            user_achievement < count_events?
                                Math.floor(10000*user_achievement/count_events)/100+"% 진행 중"
                            :
                                "플랜 진행 완료"
                        }
                        headings={4}
                        />
                </View>
                <Text 
                    align="left" 
                    content={content}
                    flex={2}
                    marginVertical={6}
                    headings={2}
                    />
            </View>
            <View style={rowContainer}>
                <FontAwesome
                    onPress={toggleLike}
                    name={likes ? "heart" : "heart-o"}
                    size={25} 
                    color={red}
                />
                <Number
                    headings={2}
                    value={
                        count_likes + +Boolean(likes) - +Boolean(user_likes)
                    } 
                    marginHorizontal={8}
                />
            </View>
            <View style={{flex:0.5}}>
                {
                    profile?.nickname === nickname && (
                        <EvilIcons
                            name="close"
                            size={25} 
                            color={theme.text}
                            onPress={deleteIt}
                        />
                    )
                }
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
            flex:0.8, 
            flexDirection: "row",
            justifyContent:"flex-end",
        }
    })
}