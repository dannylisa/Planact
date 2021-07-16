import useTheme from "@/modules/theme/hooks";
import { DefaultTheme } from "@/style/styled";
import { FontAwesome } from "@expo/vector-icons";
import React, { useMemo, useState } from "react";
import { StyleSheet, TouchableOpacity, View, ViewProps } from "react-native";
import { TextInput } from "../materials";

interface NewCommentProps extends ViewProps {
    floorFixed?: boolean
    createComment: (comment:string) => Promise<void>
    resetComments?: () => Promise<void>
}
export default function({floorFixed, style, createComment, resetComments, ...others}: NewCommentProps){
    const theme = useTheme();
    const {iconButton, newCommentContainer} = useMemo(() => styles(theme), [])
    const [comment, setComment] = useState<string>('');
    const create = () => {
        createComment(comment);
        setComment('');
        if(resetComments)
            resetComments()
    }

    return (
        <View
            style={floorFixed ? newCommentContainer : style}
            {...others}>
            <TextInput
                flex={5}
                underlined
                placeholder="댓글을 입력하세요!"
                value={comment}
                onChangeText={setComment}
            />
            <TouchableOpacity 
                onPress={create}
                style={iconButton}
                >
                <FontAwesome 
                    name="send-o"
                    size={30}
                    color={theme.primary.main}
                />
            </TouchableOpacity>
        </View>
    )
}

const styles = (theme:DefaultTheme) => {
    return StyleSheet.create({
        iconButton:{
            position: "absolute",
            top:28,
            right: 25,
            alignItems:"center",
            justifyContent:"center"
        },
        newCommentContainer:{
            backgroundColor: theme.mainBackground,
            flexDirection: "row",
            bottom: 0,
            height: 80,
            width: "100%",
            padding: 12
        }
    })
}