import { createScheduleComment, deleteScheduleComment, getScheduleComment } from "@/api/market";
import { ITokenHeader, useUserState } from "@/modules/auth/hooks";
import { IScheduleComment } from "@/utils/data";
import { AxiosError, AxiosResponse } from "axios";
import { useState } from "react";
import { Alert } from "react-native";

export default (schedule_id: string) => {
    const [comments, setComments] = useState<IScheduleComment[]>([]);
    const {getToken} = useUserState()

    const resetComments = (token:ITokenHeader) => {
        getScheduleComment(token, schedule_id)
            .then((res:AxiosResponse<IScheduleComment[]>) => {
                setComments([...res.data])
            })
    }
    
    const createComment = async (comment: string) => {
        getToken().then(async token => {
            if(!token)
                throw Error;
            else{
                await createScheduleComment(token, schedule_id, comment)
                return token
            }
        }).then(resetComments)
    }

    const deleteComment = (comment_id:string) => {
        const deleteIt = async () => {
            await getToken().then(async token => {
                if(!token)
                    throw Error;
                else{
                    await deleteScheduleComment(token, comment_id)
                    return token
                }
            }).then(resetComments)
            Alert.alert('삭제되었습니다.')
        }

        Alert.alert('댓글을 삭제하시겠습니까?','',[
            { text: '취소', style: 'cancel'},  
            {
                text: '삭제', 
                onPress: deleteIt
            },
        ])
    }

    return {
        comments,
        resetComments,
        createComment,
        deleteComment
    }
}