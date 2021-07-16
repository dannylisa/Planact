import { createScheduleComment, getScheduleComment } from "@/api/market";
import { useUserState } from "@/modules/auth/hooks";
import { IScheduleComment } from "@/utils/data";
import { AxiosError, AxiosResponse } from "axios";
import { useState } from "react";
import { Alert } from "react-native";

export default (schedule_id: string) => {
    const { getToken } = useUserState();
    const [comments, setComments] = useState<IScheduleComment[]>([]);

    const resetComments = async () => {
        const token = await getToken();
        if(!token) return;
        await getScheduleComment(token, schedule_id)
            .then((res:AxiosResponse<IScheduleComment[]>) => {
                setComments(res.data)
            }).catch((err:AxiosError) => Alert.alert("서버 오류입니다."));
    }
    
    const createComment = async (comment: string) => {
        const token = await getToken();
        if(!token) return;
        await createScheduleComment(token, schedule_id, comment)
            .then((res:AxiosResponse<IScheduleComment[]>) => {
                if(resetComments) 
                    resetComments()
            }).catch((err:AxiosError) => {
                Alert.alert("서버 오류입니다.")
            });
    }

    return {
        comments,
        resetComments,
        createComment
    }
}